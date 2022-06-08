// const defintion \\

const sendCommentBtn = document.querySelector('#send-body button')
const replyBtn = document.getElementsByClassName('replybtn');

const sendComment = document.querySelector('.send-comment');
const commentTemp = document.getElementById('comment-temp');

const replies = document.getElementsByClassName('reply');
const ulList = document.getElementsByTagName('ul')[0];
const vline = document.getElementById('vline')

const modal = document.querySelector('.modal')

const PLUS = "plus"
const MINUS = "minus"

//-----  math operations  ----- \\

function pulsOne (preVaule){
    return preVaule += 1
}
function minusOne (preVaule){
    return preVaule -= 1
}

function plusAndMinus (math){
    let innerValue = selectBtn.parentElement.children["ranks-num"]
    let preVaule = parseInt(innerValue.textContent)
    if ( math === MINUS){
        newValue = minusOne(preVaule);
    }else if(math === PLUS){
        newValue = pulsOne(preVaule);
    }
    
    return innerValue.textContent = newValue
};

//-----  access to plus and minus buttons  ----- \\

ulList.addEventListener('click',(event)=>{
    if (event.target.className === "minusBtn" ||
    event.target.className === "fa-solid fa-minus") {
        
        if (event.target.className === "minusBtn") {
            selectBtn = event.target
        }
        
        else if (event.target.className === "fa-solid fa-minus"){
            selectBtn = event.target.closest(".minusBtn")
        }
        plusAndMinus (MINUS);
        const rankDiv = event.target.closest('div');
        compareReplies (rankDiv,MINUS)
    }
})

ulList.addEventListener('click',(event)=>{
    if (event.target.className === "plusBtn" ||
    event.target.className === "fa-solid fa-plus") {
        
        if (event.target.className === "plusBtn") {
            selectBtn = event.target         
        }else if (event.target.className === "fa-solid fa-plus"){
            selectBtn = event.target.closest(".plusBtn")
        }
        plusAndMinus (PLUS);
        const rankDiv = event.target.closest('.ranking');
        compareReplies (rankDiv,PLUS)
    }
})

// ----  compare between numbers  ----- \\

function compareReplies (rankDiv,math){
    const currentLi = rankDiv.closest('li')
    let holdedSiblngLi = undefined;

    if (currentLi.nextElementSibling === null && math === MINUS ||
        currentLi.previousElementSibling === null && math === PLUS ||
        currentLi.previousElementSibling === vline && math === PLUS ||
        currentLi.previousElementSibling === modal && math === PLUS 
        ){
            return;
        } else{
            if ( math===PLUS && currentLi.previousElementSibling !== null) {
                const prevSiblngli = currentLi.previousElementSibling;
                holdedSiblngLi = prevSiblngli;
            }else if( math===MINUS && currentLi.nextElementSibling !== null ) {
                const nextSiblngli = currentLi.nextElementSibling;
                holdedSiblngLi = nextSiblngli;
            } 
            
            const siblngNum = parseInt(holdedSiblngLi.getElementsByClassName('ranks-num')[0].textContent)
            const targetNum = parseInt(currentLi.getElementsByClassName('ranks-num')[0].textContent);
            
            if (math === PLUS) {
                if (targetNum > siblngNum) {
                    holdedSiblngLi.insertAdjacentElement("beforebegin",currentLi)
            }
        } else if(math === MINUS){
            if (targetNum < siblngNum) {
                holdedSiblngLi.insertAdjacentElement("afterend",currentLi) }
            }}}
            
    // ----  handling comments and replies  ----- \\
    
    function modifiySendings(importType,text){
    let importedNode = undefined;
    if (importType === "comment") {
        const commentTempate = commentTemp.content.firstElementChild.cloneNode(true);
        importedNode = commentTempate;
        importedNode.querySelector('.client-comment p').textContent = text
         
    }else if (importType === "reply"){
        const replyTemp = document.getElementById('reply-temp');
        const replyTempate = replyTemp.content.firstElementChild.cloneNode(true)
        importedNode = replyTempate;
        importedNode.getElementsByClassName('client-reply-para')[0].textContent = text
    }
    importedNode.querySelector('#client-name').textContent = "Abdoallah Badr"
    importedNode.querySelector('#duration').textContent = `${parseInt(Math.random()*30)} days ago`
    importedNode.querySelector('#ranks-num').textContent = 0
    importedNode.querySelector('img').outerHTML = `<img src="images/person/peep-1.png">`
    if (importType === "comment") {
        ulList.append(importedNode)
    } else if (importType === "reply") {
        currentLi.getElementsByTagName('ul')[0].insertAdjacentElement('beforeend',importedNode)
    }}
    
    sendCommentBtn.addEventListener('click',()=>{
        const commentTextArea = document.querySelector('.send-comment textarea');
        if(commentTextArea.value===""){
            alert('your comment is empty')
        }
        modifiySendings("comment",commentTextArea.value )
    })
    
    ulList.addEventListener('click',(event)=>{
    const sendNode = document.importNode(sendComment,true)
    if (event.target.className === "replybtn") {
        currentLi = event.target.closest('.comment');
        currentUl = currentLi.getElementsByTagName('ul')[0];
        if(currentLi.lastElementChild.className!== "send-comment" ){
            currentLi.append(sendNode);
        }
        const replyTextArea = currentLi.getElementsByTagName('textarea')[0];
        const sendReplyBtn = sendNode.getElementsByClassName('sendBtn')[0];
        sendReplyBtn.textContent = "Reply"
        replyTextArea.setAttribute("placeholder", " Add a reply...");
        sendReplyBtn.addEventListener('click',()=>{
            const replyTextAreaVal = replyTextArea.value;
            if(replyTextAreaVal ===""){
                alert('your reply is empty')
            }
            modifiySendings("reply",replyTextAreaVal);    
            sendNode.remove();                            
        })}
    })
    
    // ----  modal and delete comments  ----- \\

    function modalOff(){
    let modal = document.getElementsByClassName('modal.visible')[0];  // we can use classlist.toggle()
    modal.className = "modal";
}
ulList.addEventListener('click',(event)=>{
    let modal = document.getElementsByClassName('modal')[0];
    if (event.target.className === "delComment") {
        modal.className += ".visible"
        currentLi = event.target.closest('li')
    }
    if (event.target.className === "okBtn") {
        currentLi.remove();
        modalOff();
        
    } else if (event.target.className === "noBtn" ||
    event.target.className === "backdrop"){
        modalOff();
    }
})