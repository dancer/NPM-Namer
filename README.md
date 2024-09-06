
# Check NPM Names

![npm-check-logo](https://img.shields.io/npm/v/npm-name)

A simple command-line tool to check if package names are available on [npmjs.com](https://npmjs.com). It reads names from a file and outputs the available names into a separate file.

## Features

- ⚡️ **Fast & Efficient**: Uses a progress bar to show status as names are checked.
- 🎨 **Colored Output**: Easily see which names are available (in green) and which aren't (in red).
- 📝 **File-based Input/Output**: Reads package names from a text file and saves available names to a new file.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<username>/check-npm-names.git
   cd check-npm-names
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

1. Create a text file (`package-names.txt`) and list the package names you want to check, one name per line:
   ```
   package-name-1
   package-name-2
   package-name-3
   ```

2. Run the script:
   ```bash
   node check-npm-names.js
   ```

3. The script will generate a file named `available-names.txt` with all the available names.

## Example

\`\`\`bash
Checking 3 names from package-names.txt...
  ███████████████████ 100% | 3/3
  package-name-1: Available
  package-name-2: Not Available
  package-name-3: Available
2 available names saved to available-names.txt
```

## Customization

- **Input File**: By default, the script looks for a file named `package-names.txt`. You can modify this in the code to use a different input file.
- **Output File**: Available names are saved to `available-names.txt`. This can also be changed in the script as needed.

## Dependencies

- [npm-name](https://www.npmjs.com/package/npm-name) — Check npm package name availability
- [chalk](https://www.npmjs.com/package/chalk) — Terminal string styling for colored output
- [cli-progress](https://www.npmjs.com/package/cli-progress) — Progress bar for the terminal
- [p-limit](https://www.npmjs.com/package/p-limit) — Controls the concurrency of asynchronous tasks
- [fs/promises](https://nodejs.org/api/fs.html#fspromises)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by [DxD](https://github.com/dancer)**
