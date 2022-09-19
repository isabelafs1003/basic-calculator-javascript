const previousOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll('#buttons-container button');  // selecionando todos os bottoes da div container

// Orientação a Objetos - logica da calculadora
class Calculator {
    constructor(previousOperationText, currentOperationText){  // inicializa propriedades, e serve para especificar as diferenças de cada obj
        this.previousOperationText = previousOperationText;  // impresso nat tela
        this.currentOperationText = currentOperationText;  // impresso nat tela
        this.currentOperation = ''; // inicializa com valor vazio - modif pelo usuario
    };

    // metodo que espera a incersão de um digito na tela
    addDigit(digit){
        // checando se a operacao atual tem um ponto
        if(digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return;
        };


        this.currentOperation = digit;   // definindo operaçoes atuais em digitos,  importante para saber qual operacao deverá ser feita ao clicar num digito. 
        this.updateScreen()  // atualiza a tela
    };

    // metodo para processar todas as operacoes da calculadora
    processOperation(operation) {
        // verificando se o valor current esta vazio
        if(this.currentOperationText.innerText === '' && operation !== 'C') {
            // mudança de operação
            if (previousOperationText.innerText !== '') {
                this.changeOperation(operation);  // apenas muda de operação
            }
            return;
        }


        // pegar valores atuais e passados, p/ efetuar operacoes
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(' ')[0];   // + faz a conversao num, e split tira o espaço, para efetuar o calculo
        const current = +this.currentOperationText.innerText;

        // vefifica operacoes
        switch(operation) {
            case '+':
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case '-':
                operationValue - previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case '/':
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case '*':
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case 'DEL':
                // Apenas a execucao do metodo
                this.processDelOperator();
                break;
            case 'CE':
                operationValue = previous * current;
                // Apenas a execucao do metodo
                this.processClearCurrentOperation();
                break;
            case 'C':
                // Apenas a execucao do metodo
                this.processClearOperation();
                break;
            case '=':
                // Apenas a execucao do metodo
                this.processEqualOperation();
                break;
            default:
                return;
        }
    };


    // muda os valores da calculadora na tela
    updateScreen(operationValue = null,   // resultado de uma das operacoes do switch
                 operation = null,   // é oq usuario envia ao acessaar o  metodo processOperation
                 current = null,   // numero atual
                 previous = null) {   // numero passado
        console.log(operationValue, operation, current, previous);

        if (operationValue === null) {  // se for o metodo addDigit
        this.currentOperationText.innerText += this.currentOperation;  // esta sendo inserido os numeros da operacao atual concatenados, dentro do texto da operacao atual
        } else {  // se for, o metodo processOperation
            // checando se o valor for zero, se for, somente adicionar o valor
            if(previous === 0) {
                operationValue = current;
            };

            //  adcionando o valor atual no valor passado
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            
            // zerar o valor atual, para add novo valor
            currentOperationText.innerText = ''; 
        };
    };

    // mudando operador matematico
    changeOperation(operation){  // recebe operação como parametro
        const mathOperations = ['*', '+', '-', '/']

        if (!mathOperations.includes(operation)) {
            return;
            // se a operação não estiver dentro do array mathOperations, ele apenas retorna
        };

        // remove apenas o ultimo caracter e adiciona um nomo
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;  
    };

    // Deletar um digito (ultimo digito)
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    };

    //  limpa operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = '';
    };

    // limpa todas as operacoes (atual e passada)
    processClearOperation() {
        this.currentOperationText.innerText = '';
        this.previousOperationText.innerText = '';
    };

    // processa o resultado da expressão
    processEqualOperation() {
        const operation = previousOperationText.innerText.split(' ')[1];
        this.processOperation(operation);
        console.log(operation)
    }
};


const calc = new Calculator(previousOperationText, currentOperationText);  // instanciando



// ativando eventos dos botoes
buttons.forEach((btn) => {   // ára cada botao
    btn.addEventListener('click', (e) => {    // ao clicar, será disparado um evento
        const value = e.target.innerText  // pegando o valor de cada botao
        
        // separando operações dos numeros
        if(+value >= 0 || value === '.'){  // validando os numeros, o + tem a funcao do parse, ou seja, passar uma string para numero
            calc.addDigit(value);

        } else {
            calc.processOperation(value);
        };
    });
});