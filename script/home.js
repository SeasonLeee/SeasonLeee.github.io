(function () {
    const content = document.querySelector('.content');
    const cursor = document.querySelector('.cursor');
    const line1 = 'Hi, I\'m Benjamin!';
    const line2 = 'Nice meeting you😆';
    const line3 = 'So, in the spirit of \'A new life start with something new\' I created this project to celebrate the freedom and to document my thoughts in the upcoming adventure!';
    const line4 = 'Well, here we go~👨‍💻🏃‍♂️💪👊🤣'

    const question = 'Keep chatting or see posts directly?'

    const line1Arr = [...line1];
    const line2Arr = [...line2];
    const line3Arr = [...line3];
    const line4Arr = [...line4];

    const questionArr = [...question];

    let timeouts = [];

    const siteNav = document.querySelector('.site-nav');
    const postsNav = document.querySelector('.nav-item');

    const questBtnContainer = document.querySelector('.option-container');
    const formerBtn = document.querySelector('.former-btn');
    const latterBtn = document.querySelector('.latter-btn');

    // be careful of this crazy nth-of-type selector
    const text = document.querySelector('.content > .text:nth-of-type(3)');

    // TODO: make this whatever-it-is... more concise... 
    new Promise((resolve, reject) => {
        typing(1, line1Arr, 121, false, resolve);
    })
    .then(() => {
       return new Promise((resolve, reject) => {
            typing(2, line2Arr, 121, false, resolve);
        })        
    })

    .then(() => {
        return new Promise((resolve, reject) => {
            typing(2, questionArr, 121, true, resolve);
        })
    })

    .then(() => {
        return new Promise((resolve, reject) => {
            content.appendChild(questBtnContainer);
            questBtnContainer.classList.remove('hidden');

            formerBtn.addEventListener('click', () => {
                // console.log(`text == ${document.querySelector('.content > .text:nth-of-type(3)')}`);
                // text.classList.add('hidden');
                
                document.querySelector('.content > .text:nth-of-type(3)').classList.add('hidden');

                questBtnContainer.classList.add('hidden');
                resolve('former');
            });

            latterBtn.addEventListener('click', () => {
                // console.log(text);
                // text.classList.add('hidden');

                document.querySelector('.content > .text:nth-of-type(3)').classList.add('hidden');

                questBtnContainer.classList.add('hidden');
                resolve('latter');
            });
        })
    })

    .then((res) => {
        if (res === 'former') {
            return new Promise((resolve, reject) => {
                typing(2, line3Arr, 121, false, resolve);
            })
            .then(() => {
                return new Promise((resolve, reject) => {
                    typing(2, line4Arr, 100, true, resolve)
                })
            })
            .then(() => {
                content.appendChild(siteNav);
                postsNav.classList.remove('hidden');
            })            
        } else if (res === 'latter') {
            return new Promise((resolve, reject) => {
                typing(2, line4Arr, 100, true, resolve)
            })
            .then(() => {
                content.appendChild(siteNav);
                postsNav.classList.remove('hidden');
            }) 
        }
    })

    // .then(() => {
    //     return new Promise((resolve, reject) => {
    //         typing(2, line3Arr, 121, false, resolve);
    //     })
    // })
    // .then(() => {
    //     return new Promise((resolve, reject) => {
    //         typing(2, line4Arr, 100, true, resolve)
    //     })
    // })
    // .then(() => {
    //     content.appendChild(siteNav);
    //     postsNav.classList.remove('hidden');
    // })

    function insertElement(parent, child, letter) {
        content.appendChild(parent);
        // create node element
        let span = document.createElement(child);
        // put text into span element
        if (letter) span.innerText = letter;
        // insert created element into dom
        parent.insertBefore(span, cursor);
    }

    function typing(type, letterArr, time, isLastLine, resolve) {
        let line = document.createElement('p');
        line.appendChild(cursor);
        if (type == 1) {
            cursor.classList.add('cursor-big');
            line.setAttribute('class', 'title');
        } else {
            cursor.classList.remove('cursor-big');
            line.setAttribute('class', 'text');
        }

        for (let i = 0; i < letterArr.length; i++) {
            timeouts.push(setTimeout(() => {
                insertElement(line, 'span', letterArr[i]);
                // clear all the timeout to release space
                if (i == letterArr.length - 1) {
                    timeouts.forEach(ele => { if (ele) { clearTimeout(ele) } });
                    
                    if (resolve) resolve();

                    if (isLastLine == false) {
                        // insertElement('br');
                        // resolve();
                    } else {
                        line.removeChild(cursor);
                    }

                    if (resolve) resolve();
                }
            }, time * i));
        }
    }
})();
