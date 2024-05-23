import { File, FingerprintIndex, Options, TokenizedFile } from "@dodona/dolos-lib";
import { ProgrammingLanguage } from "../node_modules/@dodona/dolos-lib/dist/lib/language.js";

type Runtime = "cpp" | "python";
type Code = {
  code: string;
  path: string;
  runtime: Runtime;
};

const index = new FingerprintIndex(Options.defaultKgramLength, Options.defaultKgramsInWindow);

// Problem Sample: https://leetcode.com/problems/fizz-buzz/
const codes: Code[] = [
  {
    // solution 1
    code: `class Solution(object):
    def fizzBuzz(self, n):
        answer = []
        for i in range(1, n + 1):
            if i % 15 == 0:
                answer.append("FizzBuzz")
            elif i % 3 == 0:
                answer.append("Fizz")
            elif i % 5 == 0:
                answer.append("Buzz")
            else:
                answer.append(str(i))
        return answer`,
    path: "/path/to/solution_1",
    runtime: "python",
  },
  {
    // solution 2
    code: `class Solution(object):
    def fizzBuzz(self, n):
        answer = []
        for i in range(1, n + 1):
            result = ""
            if i % 3 == 0:
                result += "Fizz"
            if i % 5 == 0:
                result += "Buzz"
            if result == "":
                result = str(i)
            answer.append(result)
        return answer`,
    path: "/path/to/solution_2",
    runtime: "python",
  },
  {
    // solution 3
    code: `class Solution(object):
    def fizzBuzz(self, n):


        result   = []


        for x in range(1, n+1):

            if x%15==0:
                    result.append("FizzBuzz")
            elif x%3==0:
                    result.append("Fizz")
            elif x%5==0:
                    result.append("Buzz")
            else:
                    result.append( str( x ) )
        return result`,
    path: "/path/to/solution_3",
    runtime: "python",
  },
];

const tokenizedFiles: TokenizedFile[] = [];
for (const code of codes) {
  const language = new ProgrammingLanguage(code.runtime, []);
  const tokenizer = await language.createTokenizer();

  const file = new File(code.path, code.code);
  const tokenizedFile = tokenizer.tokenizeFile(file);

  tokenizedFiles.push(tokenizedFile);
}

index.addFiles(tokenizedFiles);

// solution 1 and 2
const pair12 = index.getPair(tokenizedFiles[0], tokenizedFiles[1]);
const fragments12 = pair12.buildFragments();
console.log({
  pair: "solution_1 and solution_2",
  similarity: pair12.similarity,
  left: fragments12[0].leftSelection,
  right: fragments12[0].rightSelection,
});

// solution 1 and 3
const pair13 = index.getPair(tokenizedFiles[0], tokenizedFiles[2]);
const fragments13 = pair13.buildFragments();
console.log({
  pair: "solution_1 and solution_3",
  similarity: pair13.similarity,
  left: fragments13[0].leftSelection,
  right: fragments13[0].rightSelection,
});
