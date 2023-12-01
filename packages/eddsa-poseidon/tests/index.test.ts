import { eddsa } from "circomlibjs"
import { generatePublicKey, signMessage, verifySignature } from "../src"

describe("EdDSAPoseidon", () => {
    const privateKey = "secret"
    const message = BigInt(2)

    it("Should derive a public key from a private key", async () => {
        const publicKey = generatePublicKey(privateKey)

        const circomlibPublicKey = eddsa.prv2pub(privateKey)

        expect(publicKey[0]).toBe(circomlibPublicKey[0].toString())
        expect(publicKey[1]).toBe(circomlibPublicKey[1].toString())
    })

    it("Should derive a public key from an hexadecimal private key", async () => {
        const privateKey = "0x12"

        const publicKey = generatePublicKey(privateKey)

        const circomlibPublicKey = eddsa.prv2pub(Buffer.from(privateKey.slice(2), "hex"))

        expect(publicKey[0]).toBe(circomlibPublicKey[0].toString())
        expect(publicKey[1]).toBe(circomlibPublicKey[1].toString())
    })

    it("Should sign a message", async () => {
        const signature = signMessage(privateKey, message)

        const circomlibSignature = eddsa.signPoseidon(privateKey, message)

        expect(signature.R8[0]).toBe(circomlibSignature.R8[0].toString())
        expect(signature.R8[1]).toBe(circomlibSignature.R8[1].toString())
        expect(signature.S).toBe(circomlibSignature.S.toString())
    })

    it("Should verify a signature", async () => {
        const publicKey = generatePublicKey(privateKey)
        const signature = signMessage(privateKey, message)

        expect(verifySignature(message, signature, publicKey)).toBeTruthy()
    })
})
