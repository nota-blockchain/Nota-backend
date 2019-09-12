from web3 import Web3, HTTPProvider 
import json
rpc_url = "http://127.0.0.1:4040" 
w3 = Web3(HTTPProvider(rpc_url))
w3.personal.unlockAccount(w3.eth.accounts[0], "rtucJ7G%e65uCNTE", 0)
# notice : You need abi.json on your execute dir 
with open("/home/geth/blockpaper-dapp/abi.json") as f:
    info_json = json.load(f)
abi = info_json # set abi
contract = w3.eth.contract(address='0x6e232ea7fBafB4866bB4F2Ec41dceB4AA4a6afaF', abi=abi) 
#컨트렉트 주소는 Ropsten Network Latest Deploy 기준, 메인넷 싱크 완료 후 변경예정

def setvalue(PaperId,ContractType,TimeStamp,FileHash,GapSign,EulSign):
    #요구사항 : "1", "0", "201902061141","updated!!!", "gap2", "eul2"
    # 전체 타입 string임
    tx_hash = contract.transact({"from": w3.eth.accounts[0],}).set_all(PaperId, ContractType, TimeStamp, FileHash, GapSign, EulSign)
    print("sended")
    w3.eth.waitForTransactionReceipt(tx_hash) #여기서 지연시간 꽤 생김. 트렌젝션이 생길때 까지 대기하는부분.
    print(tx_hash)
    print('updated value: {}'.format(contract.call().get_all())) 
    # is call latest value

def readvalue(txhash): 
    #값을 불러오고싶은 트렌젝션의 txhash
    txdata = w3.eth.getTransaction(txhash)
    input = txdata['input']
    
    final = contract.decode_function_input(input)
    return(final[1])

    #{'newPaperId': 1, 'newContractType': '0', 'newTimeStamp': 201902061141, 'newFileHash': 'updated!!!', 'newGapSign': 'gap2', 'newEulSign': 'eul2'})
 
# def sendrawtr():
#     acct = w3.eth.account.privateKeyToAccount(privateKey)
#     construct_txn = contract_.constructor().buildTransaction({
#         'from': acct.address,
#         'nonce': w3.eth.getTransactionCount(acct.address),
#         'gas': 1728712,
#         'gasPrice': w3.toWei('21', 'gwei')})
#     signed = acct.signTransaction(construct_txn)
#     w3.eth.sendRawTransaction(signed.rawTransaction)




    # class DeployContract:
    # def __init__(self, abi, bin, public_key, private_key):
    #     provider = 'https://ropsten.infura.io/YOUR_INFURA_KEY'
    #     self.w3 = Web3(Web3.HTTPProvider(provider))
    #     self.abi = abi # Your contract ABI code
    #     self.bin = bin # Your contract ByteCode 
    #     self.priv = private_key
    #     self.pub = public_key

    # def deploy(self):
    #     instance = self.w3.eth.contract(abi=self.abi, bytecode=self.bin)
    #     # hacky .. but it works :D
    #     tx_data = instance.constructor().__dict__.get('data_in_transaction')
    #     transaction = {
    #         'from': self.pub, # Only 'from' address, don't insert 'to' address
    #         'value': 0, # Add how many ethers you'll transfer during the deploy
    #         'gas': 2000000, # Trying to make it dynamic ..
    #         'gasPrice': self.w3.eth.gasPrice, # Get Gas Price
    #         'nonce': self.w3.eth.getTransactionCount(self.pub), # Get Nonce
    #         'data': tx_data # Here is the data sent through the network
    #     }
    #     # Sign the transaction using your private key
    #     signed = self.w3.eth.account.signTransaction(transaction, self.priv)
    #     #print(signed.rawTransaction)
    #     tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
    #     print(tx_hash.hex())

# setvalue(' '"1", "0", "201902061141","updated!!!", "gap2", "eul2" ')
