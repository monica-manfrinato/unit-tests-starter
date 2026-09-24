const ProdutoService = require("../../services/ProdutoService")

describe("ProdutoService - testes unitários", () => {
    let service;
    let mockRepository

    beforeEach(() =>{
        mockRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            delete: jest.fn()
        }

        //Injeção de dependência (acessa, testa sem mexer nos dados de verdade)
        service = new ProdutoService(mockRepository)
    })

    describe("Listar", () => {
        test("Chama repository.findAll uma vez e retorna o resultado", () =>{
            //Cria os produtos porque é fictício, é um mock!
            const produtos = [{ id: 1, nome: "Coxinha", preco: 5}]

            mockRepository.findAll.mockReturnValue(produtos)
            const resultado = service.listar()

            expect(mockRepository.findAll).toHaveBeenCalledTimes(1)
            expect(resultado).toEqual(produtos)
        })


        test("Chama repository.findById uma vez e retorna o resultado", () =>{
            //Cria os produtos porque é fictício, é um mock!
            const produtos = { id: 1, nome: "Coxinha", preco: 5}

            mockRepository.findById.mockReturnValue(produtos)
            const resultado = service.buscarPorId(1)

            expect(mockRepository.findById).toHaveBeenCalledTimes(1)
            expect(resultado).toEqual(produtos)
        })


        test("Deve repassar dados para mockRepository.create e retornar o produto criado", () => {
            //Cria os produtos porque é fictício, é um mock!
            const dadosNovos = { nome: "Coxinha", preco: 5 }
            const produtoCriado = { id: 1, ...dadosNovos }

            mockRepository.create.mockReturnValue(produtoCriado)
            const resultado = service.criar(dadosNovos)

            expect(mockRepository.create).toHaveBeenCalledWith(dadosNovos)
            expect(resultado).toEqual(produtoCriado)
        })

        test("Deve propagar o erro lancado pelo repository quando os dados forem invalidos", () => {
            const dadosInvalidos = { nome: "", preco: -5 }

            mockRepository.create.mockImplementation(() => {
                throw new Error("Dados inválidos")
            })

            expect(() => service.criar(dadosInvalidos)).toThrow("Dados inválidos")
        })

        test("Exclusão de produto", ()=>{
            mockRepository.delete.mockReturnValue(true)

            expect(() => service.remover(1)).not.toThrow()
            expect(mockRepository.delete).toHaveBeenCalledWith(1)
            })
        })

        test("Lançar erro ao não encontrar o produto",()=>{
            mockRepository.delete.mockReturnValue(false)
            expect(()=> service.remover(99)).toThrow("Produto nao encontrado")
        })
    })
