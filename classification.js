const LEFT=0;
const RIGHT=1;
class Node {
    // constructor
    constructor(attribute) {
        this.attribute = attribute;
        this.descendants=[];
    }
}
class Stack {
    constructor() {
        this.items = [];
    }
    
    // add element to the stack
    add(element) {
        return this.items.push(element);
    }
    
    // remove element from the stack
    remove() {
        if(this.items.length > 0) {
            return this.items.pop();
        }
    }
    
    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }
    
    // check if the stack is empty
    isEmpty(){
       return this.items.length == 0;
    }
   
    // the size of the stack
    size(){
        return this.items.length;
    }
 
    // empty the stack
    clear(){
        this.items = [];
    }
    
}
function findCount(words,input)
{
    let count=0;
    input=input.toLowerCase();
    len=input.length;
    text=storeText(words);
    if(len==1)
    {
        textLength=text.length;
        for(i=0;i<textLength;i++)
            {
                if(text[i]==input)
                {
                    count+=1;
                }
            }
    }
    else
    {
        
        for(word in words)
            {
                if(input===word)
                    count+=1;
            }


    }
    return count;


}
function findIndex(words)
{
    let i=0,len=words.length;
    for(i=0;i<len;i++)
        {
            if(words[i]=="in")
            break;
        }
    i+=1;
    return i;
}
function storeText(words)
{
    var text="";
    let len=words.length;
    let index=findIndex(words);
    for(i=index;i<len;i++)
        {
            text+=words[i];
        }
    return text;

}
module.exports=function (expression)
{
    
    let stack = new Stack();
    let head=new Node("classification");
    stack.add(head);
    let curr=head;
    let words = expression.split(' ');
    let index=0;
    let info={}
    let noOfWords=words.length;
    for (index=0;index<noOfWords;index++){
        curr=stack.peek();
        if(words[index]=="count")
        {
            countIndex=index+2;
            let value=findCount(words,words[countIndex]);
            //console.log(value);
            let newNode=new Node(value);
            if(curr.descendants[LEFT]==null)
            {
                curr.descendants[LEFT]=newNode;
            }
            else
            {
                curr.descendants[RIGHT]=newNode;
                stack.remove();
            }
            
            

        }
        else if(words[index]=="sum")
        {
            let newNode=new Node("sum");
            if(curr.descendants[LEFT]==null)
            {
                curr.descendants[LEFT]=newNode;
                stack.add(newNode);
            }
            else
            {
                curr.descendants[RIGHT]=newNode;
                stack.remove();
                stack.add(newNode);
                
            }
            

        }
        else if(words[index]=="maximum")
        {
            let newNode=new Node("maximum");
            if(curr.descendants[LEFT]==null)
            {
                curr.descendants[LEFT]=newNode;
                stack.add(newNode);
            }
            else
            {
                curr.descendants[RIGHT]=newNode;
                stack.remove();
                stack.add(newNode);
                
            }

        }
        else if(words[index]=="minimum")
        {
            let newNode=new Node("minimum");
            if(curr.descendants[LEFT]==null)
            {
                curr.descendants[LEFT]=newNode;
                stack.add(newNode);
            }
            else
            {
                curr.descendants[RIGHT]=newNode;
                stack.remove();
                stack.add(newNode);
                
            }

        }
        else if(words[index]=="equalto")
            {
                info["operator"]="=";
                let valueIndex=index+1;
                info["value"]=Number(words[valueIndex]);   
            }
        else if(words[index]=="greaterthan")
            {
                info["operator"]=">";
                let valueIndex=index+1;
                info["value"]=Number(words[valueIndex]);
            }
        else if(words[index]=="greaterthanequalto")
            {
                info["operator"]=">=";
                let valueIndex=index+1;
                info["value"]=Number(words[valueIndex]);
            }
        else if(words[index]=="lessthan")
            {
                info["operator"]="<";
                let valueIndex=index+1;
                info["value"]=Number(words[valueIndex]);
            }
        else if(words[index]=="lessthanequalto")
            {
                info["operator"]="<=";
                let valueIndex=index+1;
                info["value"]=Number(words[valueIndex]);
            }
        else if(words[index]=="notequalto")
            {
                info["operator"]="!=";
                let valueIndex=index+1;
                info["value"]=Number(words[valueIndex]);
            }
        
        
        
        

    }
    let actualValue=traverseTree(head);
    let result=evalExpression(actualValue,info);
    if(result)
        return "true";
    else
        return "false";

}

function printTree(curr)
{
    if(curr)
    {
        printTree(curr.descendants[LEFT]);
        console.log(curr.attribute);
        printTree(curr.descendants[RIGHT]);
    }
}
function traverseTree(curr)
{
    if(!curr)
        return;
    if(curr.descendants[LEFT])
        {
            let leftValue=traverseTree(curr.descendants[LEFT]);
            let rightValue=traverseTree(curr.descendants[RIGHT]);
            if(curr.attribute=="sum")
                return leftValue+rightValue;
            else if(curr.attribute=="maximum")
                return Math.max(leftValue,rightValue);
            else if(curr.attribute=="minimum")
                return Math.min(leftValue,rightValue);
            else if(curr.attribute=="classification")
                return leftValue;
            

        }
    else
    return curr.attribute;
    
}
function evalExpression(actualValue,info)
{
    
    if(info["operator"]==">")
        {
            return actualValue>info["value"];
        }
    else if(info["operator"]==">=")
        {
            return actualValue>=info["value"];
        }
    else if(info["operator"]=="<")
        {
            return actualValue<info["value"];
        }
    else if(info["operator"]=="<=")
        {
            return actualValue>=info["value"];
        }
    else if(info["operator"]=="=")
        {
            return actualValue==info["value"];
        }
    else if(info["operator"]=="!=")
        {
            return actualValue!=info["value"];
        }
}
//console.log(storeText(words));
//console.log(head.descendants[LEFT]);
//printTree(head);





