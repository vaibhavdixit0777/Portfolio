import fs from 'fs';
import ts from 'typescript';

const file = 'c:/Users/riyaa/Desktop/portfolio/Portfolio-Website/src/components/TechStack.tsx';
const content = fs.readFileSync(file, 'utf8');

const result = ts.transpileModule(content, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
  reportDiagnostics: true
});

if (result.diagnostics && result.diagnostics.length > 0) {
  result.diagnostics.forEach(d => {
    console.log(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
  });
} else {
  console.log("No syntax errors found.");
}
