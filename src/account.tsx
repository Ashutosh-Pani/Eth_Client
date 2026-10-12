import { useConnection, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";



export function Account() {


    const { address }  = useConnection();
    const { disconnect } = useDisconnect();
    const { data : ensName } = useEnsName();
    const { data :ensAvatar } = useEnsAvatar({name: ensName!});


    return (
        <div>
            { ensAvatar && <img alt="ENS Avatar" src={ ensAvatar }></img> }
            { address && <div> {ensName ? `${ensName}({address})` : address} </div> }
            <button onClick={() => { disconnect()}}> Disconnect</button>
        </div>
    )

}