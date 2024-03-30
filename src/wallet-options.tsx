import * as React from 'react'
import { Connector, useConnect } from 'wagmi'
import { walletConnect } from '@wagmi/connectors'
import { config } from './config'

export function WalletOptions() {
    const { connectors, connect } = useConnect()

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="rounded-lg border shadow-sm mx-auto max-w-md bg-black text-white" data-v0-t="card">
                    <div className="flex flex-col p-6 space-y-1">
                        <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold text-center">Connect to Wallet</h3>
                    </div>
                    <div className="p-6 space-y-4">


                        {connectors.map((connector) => (
                            <button key={connector.uid} onClick={() => connect({ connector })} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#1c1e35] text-white">
                                {connector.name}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );

}