#!/usr/bin/env node
// Lightweight validator for evaluation coverage metadata extracted by markdown-tests-to-json.js
// Validates:
// - No duplicate case_id values across all cases
// - Each case has required metadata fields: case_id, severity, rules_covered, task_type, expected_failure_mode
// - Severity is one of allowed values: low, medium, high
// - rules_covered is a non-empty array
// - Core rule coverage exists: Intent Gate, Ambiguity Gate, Evidence Gate, Validation Gate covered by at least one case

const fs = require('fs');
const path = require('path');

const generatedPath = path.join(__dirname, '../generated/evaluation-cases.json');

function toArray(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  // comma or semicolon separated string
  if (typeof v === 'string') {
    return v
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return [];
}

function main() {
  if (!fs.existsSync(generatedPath)) {
    console.error(`Missing generated metadata: ${generatedPath}`);
    process.exitCode = 1;
    return;
  }

  let data;
  try {
    data = JSON.parse(fs.readFileSync(generatedPath, 'utf8'));
  } catch (e) {
    console.error('Failed to parse generated evaluation JSON:', e.message);
    process.exitCode = 1;
    return;
  }

  const CORE_METADATA_FILES = new Set([
    'intent-gate.md',
    'ambiguity-gate.md',
    'evidence-gate.md',
    'validation-gate.md',
  ]);
  const CORE_RULES = ['Intent Gate', 'Ambiguity Gate', 'Evidence Gate', 'Validation Gate'];
  const seenCaseIds = new Map();
  const missing = [];
  const invalidSeverity = [];
  const missingRulesCovered = [];

  // Collect all cases
  const allCases = [];
  if (Array.isArray(data)) {
    data.forEach((rec) => {
      if (Array.isArray(rec.cases)) {
        rec.cases.forEach((c) => {
          allCases.push({ file: rec.file, caseName: c.case, meta: c.metadata || {} });
        });
      }
    });
  }

  // Validate per-case metadata
  allCases.forEach((item) => {
    const m = item.meta || {};
    const requiresMetadata = CORE_METADATA_FILES.has(item.file);

    // case_id required
    if (!m.case_id) {
      if (!requiresMetadata) {
        return;
      }
      missing.push(`${item.file} - ${item.caseName}: missing metadata.case_id`);
    } else {
      const key = String(m.case_id);
      if (seenCaseIds.has(key)) {
        seenCaseIds.set(key, seenCaseIds.get(key) + 1);
      } else {
        seenCaseIds.set(key, 1);
      }
    }

    // severity required and validated
    if (!m.severity) {
      if (!requiresMetadata) {
        return;
      }
      missing.push(`${item.file} - ${item.caseName}: missing metadata.severity`);
    } else {
      const sev = String(m.severity).toLowerCase();
      if (!['low', 'medium', 'high'].includes(sev)) {
        invalidSeverity.push(`${item.file} - ${item.caseName}: invalid severity '${m.severity}'`);
      }
    }

    // rules_covered required and non-empty
    if (!m.rules_covered || toArray(m.rules_covered).length === 0) {
      if (!requiresMetadata) {
        return;
      }
      missingRulesCovered.push(`${item.file} - ${item.caseName}: missing metadata.rules_covered`);
    }

    if (requiresMetadata && !m.task_type) {
      missing.push(`${item.file} - ${item.caseName}: missing metadata.task_type`);
    }

    if (requiresMetadata && !m.expected_failure_mode) {
      missing.push(`${item.file} - ${item.caseName}: missing metadata.expected_failure_mode`);
    }
  });

  // Duplicate case_ids check
  const duplicates = [];
  for (const [id, count] of seenCaseIds.entries()) {
    if (count > 1) duplicates.push(`case_id '${id}' appears ${count} times`);
  }

  // Core coverage: ensure each core rule appears in at least one case's rules_covered
  const covered = new Set();
  if (Array.isArray(data)) {
    data.forEach((rec) => {
      rec.cases.forEach((c) => {
        const m = c.metadata || {};
        toArray(m.rules_covered).forEach((r) => covered.add(r));
      });
    });
  }
  const missingCore = CORE_RULES.filter((r) => !covered.has(r));

  // Aggregate results
  const errors = [];
  if (duplicates.length) {
    errors.push('Duplicate case_id values found: ' + duplicates.join('; '));
  }
  if (missing.length) {
    errors.push('Missing metadata fields: ' + missing.join('; '));
  }
  if (invalidSeverity.length) {
    errors.push('Invalid severities: ' + invalidSeverity.join('; '));
  }
  if (missingRulesCovered.length) {
    errors.push('Missing rules_covered: ' + missingRulesCovered.join('; '));
  }
  if (missingCore.length) {
    errors.push('Core rule coverage missing for: ' + missingCore.join('; '));
  }

  if (errors.length) {
    console.error('Evaluation coverage validation failed:');
    errors.forEach((e) => console.error(' - ' + e));
    process.exitCode = 1;
  } else {
    console.log('Evaluation coverage validation passed. Core rules covered:', CORE_RULES.join(', '));
  }
}

main();
