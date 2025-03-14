import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const EstokkYamModule = buildModule('EstokkYamModule', (m) => {
  // Deploy EstokkYam tanpa parameter constructor
  const estokkYam = m.contract('EstokkYam', []);

  return { estokkYam };
});

export default EstokkYamModule;
