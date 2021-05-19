/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Keypair, Connection} from '@solana/web3.js';

// zzz
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function newAccountWithLamports(
  connection: Connection,
  lamports = 1000000,
): Promise<Keypair> {
  const account = new Keypair();
  const signature = await connection.requestAirdrop(
    account.publicKey,
    lamports,
  );
  await connection.confirmTransaction(signature);
  return account;
}

// /**
//  * @private
//  */
// async function getConfig(): Promise<any> {
//   // Path to Solana CLI config file
//   const CONFIG_FILE_PATH = path.resolve(
//     os.homedir(),
//     '.config',
//     'solana',
//     'cli',
//     'config.yml',
//   );
//   const configYml = await fs.readFile(CONFIG_FILE_PATH, {encoding: 'utf8'});
//   return yaml.parse(configYml);
// }

/**
 * Load and parse the Solana CLI config file to determine which RPC url to use
 */
export async function getRpcUrl(): Promise<string> {
  return 'http://localhost:8899';

  // try {
  //   const config = await getConfig();
  //   if (!config.json_rpc_url) throw new Error('Missing RPC URL');
  //   return config.json_rpc_url;
  // } catch (err) {
  //   console.warn(
  //     'Failed to read RPC url from CLI config file, falling back to localhost',
  //   );
  //   return 'http://localhost:8899';
  // }
}

/**
 * Load and parse the Solana CLI config file to determine which payer to use
 */
export async function getPayer(file: File): Promise<Keypair> {
  return readAccountFromFile(file)

  // try {
  //   const config = await getConfig();
  //   if (!config.keypair_path) throw new Error('Missing keypair path');
  //   return readAccountFromFile(config.keypair_path);
  // } catch (err) {
  //   console.warn(
  //     'Failed to read keypair from CLI config file, falling back to new random keypair',
  //   );
  //   return new Account();
  // }
}

// /**
//  * Create an Account from a keypair file
//  */
// export async function readAccountFromFile(filePath: string): Promise<Keypair> {
//   return Keypair.generate();

//   // const keypairString = await fs.readFile(filePath, {encoding: 'utf8'});
//   // const keypairBuffer = Buffer.from(JSON.parse(keypairString));
//   // return new Account(keypairBuffer);
// }

export async function readAccountFromFile(file: File): Promise<Keypair> {
  const fileToData = (file: File): Promise<string|ArrayBuffer|null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsText(file, 'utf8');
    })
  }

  const keypairString = (await fileToData(file))?.toString();
  if (keypairString) {
    const keypairBuffer = Buffer.from(JSON.parse(keypairString));
    const keypairArray = Uint8Array.from(keypairBuffer);
    const keypair = Keypair.fromSecretKey(keypairArray);
    return keypair;
  }

  return Keypair.generate();
}
