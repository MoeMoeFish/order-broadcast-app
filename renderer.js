const orgs = ['业务1组', '业务2组', '业务3组', '业务4组', '业务5组', '业务6组', '业务7组', '业务8组', '业务9组', '业务10组'];

(async () => {
  const toastElement = document.getElementById('liveToast');
  function showToast(text) {
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastElement);
      const toastContentElement = document.querySelector('#toastContent');
      toastContentElement.innerText = text;
      toastBootstrap.show();

  }


  console.log('run...')
  function speach(text) {
    const synth = window.speechSynthesis;

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.rate = 0.8;

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    synth.speak(utterThis);
  }

  const playButton = document.querySelector('#playButton');
  const orgSelect = document.querySelector('#orgSelect');
  const amountInput = document.querySelector('#amountInput');
  const clearButton = document.querySelector('#clearButton');

  let i = 1;
  orgs.forEach(v => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.innerText = v;
    orgSelect.appendChild(opt);
    i++
  });

  clearButton.addEventListener('click', () => {
    amountInput.value = '';
    amountInput.focus();
  })

  playButton.addEventListener('click', () => {
    const amount = amountInput.value;
    if (!amount) {
      showToast('请输入金额!')
      return
    }

    const orgV = orgSelect.value;
    const orgName = orgs[orgV - 1];
    const speachText = `${orgName} 出单 ${amount} 元！`

    speach(speachText)
  })
})()