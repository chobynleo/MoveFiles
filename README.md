# Move Files Tool
Moving pictures, JSON and other portable files.
Currently don't consider folders to move.

```
node move_files.js "sourcePath" "destPath" "reg"
```
- sourcePath: source path folder
- destPath: dest path folder
- reg: file format expected to match, eg.`.json`

eg:
```
node move_files.js "/home/MoveFiles/test" "/home/MoveFiles/test_output" ".txt"
```



