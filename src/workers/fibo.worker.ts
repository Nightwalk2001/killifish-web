export default () => {
    self.onmessage = (message) => {
        const nbr = message.data
        let n1 = 0
        let n2 = 1
        let somme = 0


        for (let i = 2; i <= nbr; i++) {
            somme = n1 + n2

            n1 = n2
            n2 = somme
        }

        const result = nbr ? n2 : n1

        postMessage(result)
    }
}
