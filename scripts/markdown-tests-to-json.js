const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const testsDir = path.join(rootDir, 'tests');
const outputDir = path.join(rootDir, 'generated');
const outputFile = path.join(outputDir, 'evaluation-cases.json');

function readMarkdownFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => ({
      file,
      content: fs.readFileSync(path.join(dir, file), 'utf8'),
    }));
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function normalizeBlock(text) {
  return text
    .replace(/^>\s?/gm, '')
    .replace(/^\s+|\s+$/g, '');
}

function parseCaseBlock(caseName, block) {
  const sectionRegex = /###\s+(Scenario|User|Bad response|Good response|Pass criteria)\s*\n([\s\S]*?)(?=\n###\s+|$)/g;
  const sections = {};
  let match;

  while ((match = sectionRegex.exec(block)) !== null) {
    const key = match[1].trim();
    sections[key] = match[2].trim();
  }

  const inputType = sections.Scenario ? 'Scenario' : sections.User ? 'User' : null;
  const input = inputType ? sections[inputType].trim() : null;

  const passCriteria = (sections['Pass criteria'] || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());

  return {
    case: caseName,
    input_type: inputType,
    input,
    bad_response: sections['Bad response'] ? normalizeBlock(sections['Bad response']) : null,
    good_response: sections['Good response'] ? normalizeBlock(sections['Good response']) : null,
    pass_criteria: passCriteria,
  };
}

function parseCases(content) {
  const caseRegex = /^##\s+(Case\s+\d+)\s*$([\s\S]*?)(?=^##\s+Case\s+\d+\s*$|\Z)/gm;
  const cases = [];
  let match;

  while ((match = caseRegex.exec(content)) !== null) {
    cases.push(parseCaseBlock(match[1].trim(), match[2]));
  }

  return cases;
}

function validateRecord(record) {
  const errors = [];

  if (!record.title) {
    errors.push('missing title');
  }

  for (const item of record.cases) {
    if (!item.input_type) errors.push(`${item.case}: missing Scenario/User section`);
    if (!item.input) errors.push(`${item.case}: missing input text`);
    if (!item.bad_response) errors.push(`${item.case}: missing bad response`);
    if (!item.good_response) errors.push(`${item.case}: missing good response`);
    if (!item.pass_criteria.length) errors.push(`${item.case}: missing pass criteria`);
  }

  return errors;
}

function main() {
  const markdownFiles = readMarkdownFiles(testsDir);
  const output = [];
  let hasErrors = false;

  for (const { file, content } of markdownFiles) {
    const record = {
      file,
      title: extractTitle(content),
      cases: parseCases(content),
    };

    const errors = validateRecord(record);
    if (errors.length) {
      hasErrors = true;
      console.error(`Validation failed for ${file}:`);
      for (const error of errors) {
        console.error(`- ${error}`);
      }
      continue;
    }

    output.push(record);
  }

  if (hasErrors) {
    process.exitCode = 1;
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${output.length} evaluation files to ${outputFile}`);
}

main();
