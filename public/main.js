const API = 'http://localhost:3000';

async function loadBlocks() {
  const blocks = await (await fetch(`${API}/blocks`)).json();
  const el = document.getElementById('blocks');
  el.innerHTML = blocks.map(b => `
    <div>
      <strong>Block #${b.height}</strong><br/>
      Hash: ${b.hash.slice(0, 12)}…<br/>
      Transactions: ${b.transactions.length}<br/>
      Nonce: ${b.nonce}<br/>
      <hr/>
    </div>
  `).reverse().join('');
}


async function loadMempool() {
  const mem = await (await fetch(`${API}/mempool`)).json();
  const el = document.getElementById('mempool');
  el.innerHTML = mem.length
    ? mem.map((tx, i) =>
        `<div>${i+1}. ${tx.fromAddress.slice(0,12)}... → ${tx.toAddress.slice(0,12)}... : ${tx.amount}</div>`
      ).join('')
    : '(Aucune transaction en attente)';
}

async function loadBalances() {
  const balances = await (await fetch(`${API}/balances`)).json();
  const el = document.getElementById('balances');
  el.innerHTML = Object.entries(balances)
    .map(([addr, amount]) => `<div><b>${addr.slice(0, 12)}...</b> : ${amount}</div>`)
    .join('');
}

async function mine() {
  document.getElementById('mineStatus').innerText = 'Mining...';
  await fetch(`${API}/mine`, { method: 'POST' });
  document.getElementById('mineStatus').innerText = 'Bloc miné !';
  loadBlocks(); loadMempool(); loadBalances();
}

async function generateWallet() {
  const wallet = await (await fetch(`${API}/wallet`)).json();
  document.getElementById('walletDisplay').innerText = JSON.stringify(wallet, null, 2);
}

document.getElementById('txForm').addEventListener('submit', async e => {
  e.preventDefault();
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const signature = document.getElementById('signature').value;

  const res = await fetch(`${API}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fromAddress: from, toAddress: to, amount, signature })
  });

  document.getElementById('txStatus').innerText = (await res.text());
  loadMempool();
});
