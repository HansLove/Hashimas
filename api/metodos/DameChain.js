export const dameCurrentChain=async()=>{
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return chainId  
    } catch (error) {
      return 0
    }
  
  
  }