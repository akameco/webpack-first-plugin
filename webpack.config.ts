import { Compiler, Plugin, Configuration } from "webpack";

class HelloWorldPlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.done.tap("Hello World Plugin", (
      stats /* stats is passed as argument when done hook is tapped.  */
    ) => {
      console.log("Hello World!");
      console.log(stats);
    });
  }
}

const config: Configuration = {
  mode: "development",
  // @ts-ignore
  plugins: [new HelloWorldPlugin({ hello: "hello" })]
};

module.exports = config;
