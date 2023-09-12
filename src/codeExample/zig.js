const code =
  'const std = @import("std");\n\npub fn main() !void {\n    const stdout = std.io.getStdOut().writer();\n    try stdout.print("{s}\n", .{"Hello World!"});\n}';
export default code;
