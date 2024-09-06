import fs from 'fs/promises';
import npmName from 'npm-name';
import pLimit from 'p-limit';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

async function readNamesFromFile(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return data.split('\n').filter(name => name.trim() !== '');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return [];
  }
}
  async function checkNames(names) {
    const limit = pLimit(1);
    const availableNames = [];
    const progressBar = new cliProgress.SingleBar({
      format: ' {bar} {percentage}% | {value}/{total}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      hideCursor: true
    });
  
    console.log('Checking package names:');
    progressBar.start(names.length, 0);

    const promises = names.map((name, index) => limit(async () => {
      try {
        const trimmedName = name.trim();
        const available = await npmName(trimmedName);
        if (available) {
          console.log(chalk.green(`  ${trimmedName}: Available`));
          availableNames.push(trimmedName);
        } else {
          console.log(chalk.red(`  ${trimmedName}: Not Available`));
        }
      } catch (error) {
        console.error(chalk.yellow(`  Error checking ${name}: ${error.message}`));
      }
      progressBar.update(index + 1);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }));

    await Promise.all(promises);
    progressBar.stop();
    return availableNames;
}async function saveAvailableNames(names, filename) {
  try {
    await fs.writeFile(filename, names.join('\n'));
    console.log(`Available names saved to ${filename}`);
  } catch (error) {
    console.error(`Error saving available names: ${error.message}`);
  }
}

async function main() {
  const inputFilename = 'package-names.txt';
  const outputFilename = 'available-names.txt';
  const names = await readNamesFromFile(inputFilename);
  
  if (names.length === 0) {
    console.log(chalk.red('No names found in the file or file is empty.'));
    return;
  }

  console.log(chalk.blue(`Checking ${names.length} names from ${inputFilename}...`));
  const availableNames = await checkNames(names);
  
  if (availableNames.length > 0) {
    await saveAvailableNames(availableNames, outputFilename);
    console.log(chalk.green(`${availableNames.length} available names saved to ${outputFilename}`));
  } else {
    console.log(chalk.yellow('No available names found.'));
  }
}

main();