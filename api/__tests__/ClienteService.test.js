const ClienteService = require("../services/ClienteService");

// Teste unitario: o service e testado em isolamento total.
// O repository e substituido por um mock (jest.fn()), assim testamos so a
// logica do service, sem depender de dados reais.
//
// Abaixo ha 1 teste pronto (listar) como referencia de estilo.
// Os demais estao como test.todo — implemente cada um seguindo o ENUNCIADO-02-CLIENTES.md.

describe("ClienteService (unitario com mocks)", () => {
  let service;
  let mockRepository;

  beforeEach(() => {
    mockRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new ClienteService(mockRepository);
  });

  describe("listar", () => {
    test("chama repository.findAll uma vez e retorna o resultado", () => {
      const clientes = [{ id: 1, nome: "Ana Souza", email: "ana@email.com" }];
      mockRepository.findAll.mockReturnValue(clientes);

      const resultado = service.listar();

      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(resultado).toEqual(clientes);
    });
  });

describe("buscarPorId", () => {

  test("repassa o id ao repository e retorna o cliente encontrado", () => {
    const cliente = { id: 1, nome: "Ana Souza", email: "ana@email.com" };
    mockRepository.findById.mockResolvedValue(cliente);
    return buscarPorId(1).then((resultado) => {
      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(resultado).toEqual(cliente);
    });
  });

  test("lanca erro 'Cliente nao encontrado' quando o repository retorna null", async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(buscarPorId(1)).rejects.toThrow("Cliente nao encontrado");

    expect(mockRepository.findById).toHaveBeenCalledTimes(1);
  });
  });

  describe("criar", () => {
    test("repassa os dados ao repository e retorna o cliente criado", () =>{
      const novoCliente = { nome: "Ana Souza", email: "ana@email.com" }
      const clienteCriado = { id: 1, nome: "Ana Souza", email: "ana@email.com" }

      mockRepository.create.mockResolvedValue(clienteCriado)

      return criarCliente(novoCliente).then((resultado) =>{
      expect(mockRepository.create).toHaveBeenCalledWith(novoCliente)
      expect(resultado).toEqual(clienteCriado)
      })
    });

    test.todo("propaga o erro quando nome ou email estiverem faltando", () =>{
    });

    test.todo("propaga o erro quando o email ja estiver cadastrado", ()=>{
    });

  });


  describe("atualizar", () => {
    
    test("chama repository.findById e repository.update quando o cliente existe", ()=>{
      const cliente = { id:1, nome: "Ana Souza", email: "ana@email.com" }
      const novosDados = { nome: "Ana Silva", email: "ana.nova@email.com" };

      mockRepository.findById.mockReturnValue(cliente)
      mockRepository.update.mockReturnValue(...cliente, ...novosDados)

      service.atualizar(1, novosDados)

      expect(mockRepository.findById).toHaveBeenCalledWith(1)
      expect(mockRepository.update).toHaveBeenCalledWith(1,novosDados)
    });

    test("lanca erro 'Cliente nao encontrado' sem chamar repository.update quando o cliente nao existe", ()=>{
      mockRepository.findById.mockReturnValue(null)

      expect(()=>{
        service.atualizar(1, {nome: "Ana"})
      }).toThrow("Cliente não encontrado")

      expect(mockRepository.update).not.toHaveBeenCalled()
    });

    test("propaga o erro quando o novo email ja pertence a outro cliente",()=>{
      mockRepository.findById.mockReturnValue({ id: 1, nome: "Ana", email: "ana@email.com" })
      mockRepository.update.mockImplementation(()=>{
        throw new Error("Email ja cadastrado")
      })

      expect(()=>{
        service.atualizar(1, {email: "duplicado@email.com"})
      }).toThrow("Email já cadastrado")
    });
  });

  describe("remover", () => {
    test.todo("chama repository.delete com o id correto quando o cliente existe");
    test.todo("lanca erro 'Cliente nao encontrado' quando o repository retorna false");
  });
});
