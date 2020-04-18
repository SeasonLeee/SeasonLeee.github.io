(function () {
    const content = document.querySelector('.content');
    const cursor = document.querySelector('.cursor');
    const line1 = 'Hi, I\'m Benjamin!';
    const line2 = 'Nice meeting you😆';
    const line3 = 'So, in the spirit of \'A new life start with something new\' I created this project to clebrate the freedom and to document my thoughts in the upcoming adventure!';
    const line4 = 'Well, here we go~👨‍💻🏃‍♂️💪👊🤣'

    const arr = [...line1];
    const arr2 = [...line2];
    const arr3 = [...line3];
    const arr4 = [...line4];

    let timeouts = [];

    // TODO: make this whatever-it-is... more concise... 
    new Promise((resolve, reject) => {
        typing(1, arr, 121, false, resolve);
    }).then(() => {
        new Promise((resolve, reject) => {
            typing(2, arr2, 121, false, resolve);
        }).then(() => {
            new Promise((resolve, reject) => {
                typing(3, arr3, 121, false, resolve);
            }).then(() => {
                typing(4, arr4, 100, true);
            })
        })
    });

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
                    if (isLastLine == false) {
                        // insertElement('br');
                        resolve();
                    } else {
                        line.removeChild(cursor);
                    }
                }
            }, time * i));
        }
    }
})();