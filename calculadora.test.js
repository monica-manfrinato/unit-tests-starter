const {soma, subtrai, multiplica, divide, ehPar, raiz, media} = require("./calculadora")
//não tem import do jest, pq pela extensão o JS já sabe q to usando ele

describe("soma", () => {
    test("soma dois numeros positivos", () => {
        expect(soma(2,3)).toBe(5)
    })

    test("soma dois numeros negativos", () => {
        expect(soma(-2,-3)).toBe(-5)
    })

    test("soma um numero positivo e um numero negativo", () => {
        expect(soma(-2,3)).toBe(1)
    })
})


describe("subtrai", () => {
    test("subtração de dois numeros positivos", () => {
        expect(subtrai(7,10)).toBe(-3)
    })

    test("subtração de dois numeros negativos", () => {
        expect(subtrai(-6,-3)).toBe(-3)
    })
})


describe("multiplica", () => {
    test("multiplicação de dois numeros positivos", () => {
        expect(multiplica(2,3)).toBe(6)
    })

    test("multiplicação de dois numeros negativos", () => {
        expect(multiplica(-2,-3)).toBe(6)
    })

    test("multiplicação de um numero positivo e um numero negativo", () => {
        expect(multiplica(-2,3)).toBe(-6)
    })

    test("multiplicação de um numero por zero", () => {
        expect(multiplica(-2,0)).toBeCloseTo(0)
    })

    test("resultado é maior que cada um dos fatores individualmente", () => {
        const resultado = multiplica(2,3)
        expect(resultado).toBeGreaterThan(2);
        expect(resultado).toBeGreaterThan(3);
    })
})


describe("divide", () => {
    test("divisão de dois numeros positivos", () => {
        expect(divide(10,2)).toBe(5)
    })

    test("divisão de numero por zero", () => {
        expect(()=> divide(10,0)).toThrow("Nao e possivel dividir por zero")
    })
})

describe("ehPar", () => {
    test("verifica se o número é par", () => {
        expect(ehPar(4)).toBe(true)
        expect(ehPar(3)).toBe(false)
    })

})


describe("media", () => {
    test("media de uma lista de inteiros", () => {
        expect(media([2,3,4])).toBe(3)
    })

    test("media com resultado decimal", () => {
        expect(media([1,2])).toBeCloseTo(1.5)
    })

    test("media está vazia", () => {
        expect(() => media([])).toThrow('A lista de numeros nao pode ser vazia')
    })

    test("erro quando o argumento não for um array", () => {
        expect(() => media(20)).toThrow('A lista de numeros nao pode ser vazia')
    })

})


describe("raiz", () =>{
    test("Calcula a raiz de um número não exato com precisão", () =>{
        expect(raiz(2)).toBeCloseTo(1.414)
    })

    test("Lança erro para numero negativo", () =>{
        expect(()=> raiz(-4)).toThrow("Nao e possivel calcular raiz de numero negativo")
    })

    test("Teste para calcular a raiz quadrada de 9", () =>{
        expect(raiz(9)).toBe(3)
    })
    //
})