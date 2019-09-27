import { Compiler, Plugin, Configuration } from "webpack";

class HelloWorldPlugin implements Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("HelloCompilationPlugin", compilation => {
      compilation.hooks.optimize.tap("HelloCompilationPlugin", () => {
        console.log("Assets are being optimized.");
      });
    });
  }
}

class FileListPlugin implements Plugin {
  apply(compiler: Compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, callback) => {
      // Create a header string for the generated file:
      let filelist = "In this build:\n\n";
      // Loop through all compiled assets,
      // adding a new line item for each filename.
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }
      // Insert this list into the webpack build as a new file asset:
      compilation.assets["filelist.md"] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        }
      };
      callback();
    });
  }
}

const config: Configuration = {
  mode: "development",
  plugins: [new FileListPlugin()]
};

export default config;
