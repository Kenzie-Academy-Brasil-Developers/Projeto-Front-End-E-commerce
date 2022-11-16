let navitrine = document.querySelector('#vitrine')
let selecionaclasse = document.querySelectorAll('.contagem-carrinho')

let soma = 0
let count = 0

criarCardItens(data)


function criarCardItens(database){

    navitrine.innerHTML = ''

    for (let i = 0; i<database.length; i++) {

        let li = document.createElement('li')
        li.classList.add('card-itens')
        navitrine.append(li)

        let img = document.createElement('img')
        img.src=database[i].img
        img.alt=database[i].nameItem

        let spanTipo = document.createElement('span')
        spanTipo.classList.add('tipo-produto')
        spanTipo.innerText = database[i].tag

        let h3nome = document.createElement('h3')
        h3nome.innerText = database[i].nameItem

        let p = document.createElement('p')
        p.innerText = database[i].description

        let spanPreco = document.createElement('span')
        spanPreco.classList.add('preco')
        spanPreco.innerText = `R$`+database[i].value

        let button = document.createElement('button')
        button.classList.add('adiciona-carrinho')
        button.innerText = database[i].addCart


        li.append(img,spanTipo,h3nome,p,spanPreco,button)

        button.addEventListener('click',function addCarrinho(){
            addMiniItens(database[i])

            soma+=database[i].value

            count++
            
            if(count == 1){
                addContaItens()
            }

            let conta = document.querySelector('.contagem')
            conta.innerText = count


            let somatoria = document.querySelector('.valor-total')
            somatoria.innerText = `R$`+soma
            
        })
    }
}



function filtraClique(db){

    let filtro = document.querySelector('ul')


    filtro.addEventListener('click', (event)=>{
        event.preventDefault()

        let referencia = event.target.classList
        
        let novaArray = []

        if(referencia.value == 'pretreino'){
            for (let i=0; i<db.length; i++) {
                if(db[i].tag[0] == 'Pré-treino'){
                    novaArray.push(db[i])
                }
            }
                criarCardItens(novaArray)            
        }else if(referencia.value == 'acessorios'){
            for (let i=0; i<db.length; i++) {
                
                if(db[i].tag[0] == 'Acessórios'){
                    novaArray.push(db[i])
                }
            }
            criarCardItens(novaArray)  
        }else if(referencia.value == 'camisas'){
            for (let i=0; i<db.length; i++) {
                
                if(db[i].tag[0] == 'Camisetas'){
                    novaArray.push(db[i])
                }
            }
            criarCardItens(novaArray)  
        }else{
            criarCardItens(db)
        }
    })
}


filtraClique(data)




function pesquisarClique(){

    let pesquisa = document.querySelector('.botao-pesquisar')



    pesquisa.addEventListener('click', (event)=>{

    event.preventDefault()

    let input = document.querySelector('#local-pesquisa')
    
    let filtro = data.filter((item)=>item.nameItem.includes(input.value))

    criarCardItens(filtro)

    // console.log(filtro)
    // console.log(input.value)
    
    })
}
pesquisarClique()


function addMiniItens(element){

    let sectionCar = document.querySelector('.carrinho-com-itens')
    // console.log(element.value)
 
 
    let li = document.createElement('li')
    let img = document.createElement('img')
    let divMini = document.createElement('div')
    let h5 = document.createElement('h5')
    let span = document.createElement('span')
    let button = document.createElement('button')


    li.classList.add('card-pequeno')
    divMini.classList.add('mini-detalhes')
    h5.classList.add('mini-produto')
    span.classList.add('mini-preco')
    button.id = 'remover-produto'


    img.src = element.img
    img.alt = element.nameItem
    h5.innerText = element.nameItem
    span.innerText = `R$`+element.value
    button.innerText = 'Remover produto'

    
    sectionCar.append(li)
    li.append(img,divMini)
    divMini.append(h5,span,button)

    let tituloVazio = document.querySelector('.vazio')
    let tituloVazio2 = document.querySelector('.vazio2')

    if(tituloVazio&&tituloVazio2){

        tituloVazio.remove()
        tituloVazio2.remove()
    }

    button.addEventListener('click', function removerCarrinho(){

        count--
        let conta = document.querySelector('.contagem')
        conta.innerText = count
        
        soma-=element.value
        let somatoria = document.querySelector('.valor-total')
            somatoria.innerText = `R$`+soma

        for (let i = 0; i<sectionCar.length; i++) {
            console.log(sectionCar.value)
        }

        li.remove()


        let contagem = document.querySelector('.contagem-carrinho')
        let finalizar = document.querySelector('.finalizar')

        if(count == 0){
            contagem.remove()
            finalizar.remove()
            createCarrinhoVazio()
        }
        
    })


}

function createCarrinhoVazio(){
    let vazio = document.querySelector('.carrinho-vazio')

    let h5 = document.createElement('h5')
    let p = document.createElement('p')

    h5.classList.add('vazio')
    p.classList.add('vazio2')

    h5.innerText = "Carrinho vazio"
    p.innerText = "Adicione itens"

    vazio.append(h5,p)
}




function addContaItens(){

        let sectionCar = document.querySelector('.carrinho-compras')

        let divContagem = document.createElement('div')
        let divQuantidade = document.createElement('div')
        let p = document.createElement('p')
        let spanQuantidade = document.createElement('span')
        let divValor = document.createElement('div')
        let pValor = document.createElement('p')
        let spanTotal = document.createElement('span')
        let button = document.createElement('button')

        divContagem.classList.add('contagem-carrinho')
        spanQuantidade.classList.add('contagem')
        divQuantidade.classList.add('quantidade')
        divValor.classList.add('valor')
        spanTotal.classList.add('valor-total')
        button.classList.add('finalizar')

        p.innerText="Quantidade"
        spanQuantidade.innerText = count
        pValor.innerText = "Total"
        spanTotal.innerText = soma
        button.innerText = "Finalizar Compra"

        sectionCar.append(divContagem,button)
        divContagem.append(divQuantidade,divValor)
        divQuantidade.append(p,spanQuantidade)
        divValor.append(pValor,spanTotal)
}





