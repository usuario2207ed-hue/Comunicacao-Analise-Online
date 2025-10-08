const services = {
  gmail: { title:"Gmail", desc:"Acesse sua caixa de entrada do Gmail.", url:"https://mail.google.com/mail/u/0/?ogbl#inbox" },
  emailjs: { title:"EmailJS", desc:"Plataforma para envio de emails via API.", url:"https://dashboard.emailjs.com/admin/history" },
  whatsapp: { title:"WhatsApp Web", desc:"Converse pelo WhatsApp no navegador.", url:"https://web.whatsapp.com/" },
  githubUser: { title:"GitHub Usuário", desc:"Perfil do usuário no GitHub.", url:"https://github.com/" },
  tinyurl: { title:"TinyURL", desc:"Encurtador de links rápido e seguro.", url:"https://tinyurl.com/" },
  ipinfo: { title:"IPInfo", desc:"Produtos e serviços de análise de IP.", url:"https://ipinfo.io/products" },
  viewdns: { title:"ViewDNS", desc:"Ferramenta para consultas de DNS e rede.", url:"https://viewdns.info/" },
  browserscan: { title:"Browser Scan PT", desc:"Analise o que seu navegador revela.", url:"https://www.browserscan.net/pt#google_vignette" },
  geospy: { title:"GeoSpy PT", desc:"Serviço de localização e rastreamento.", url:"https://geospy.net/pt/geospy" },
  privacynet: { title:"Privacy Analyzer", desc:"Teste o rastreamento da sua navegação.", url:"https://privacy.net/analyzer/" },
  aispy: { title:"AI Spy", desc:"OSINT potenciado por inteligência artificial.", url:"https://app.ai-spy.xyz/" },
  cachesleuth: { title:"Cache Sleuth", desc:"Decodificador e análise de cache.", url:"https://www.cachesleuth.com/multidecoder/" },
  maps: { title:"Google Maps Localização", desc:"Visualize coordenadas específicas no Google Maps.", url:"https://www.google.com/maps/place/22%C2%B057'06.0%22S+43%C2%B012'37.0%22W" }
};

function openPopup(serviceKey){
  const service = services[serviceKey];
  document.getElementById('popupTitle').innerText = service.title;
  document.getElementById('popupDesc').innerText = service.desc;
  document.getElementById('popupLink').onclick = () => { window.open(service.url, "_blank"); };
  document.getElementById('popupOverlay').style.display = "flex";
}

function closePopup(){
  document.getElementById('popupOverlay').style.display = "none";
}

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("public-ip").innerText = "IP Público: " + data.ip;
    return fetch("https://ipinfo.io/" + data.ip + "/json");
  })
  .then(res => res.json())
  .then(info => {
    if(info.city){
      document.getElementById("location").innerText = "Localização: " + info.city + ", " + info.region + " - " + info.country;
    } else {
      document.getElementById("location").innerText = "Localização: Indisponível";
    }
  })
  .catch(() => {
    document.getElementById("public-ip").innerText = "IP Público: Não detectado";
    document.getElementById("location").innerText = "Localização: Indisponível";
  });

function getLocalIP(callback) {
  let pc = new RTCPeerConnection({iceServers:[]});
  pc.createDataChannel("");
  pc.createOffer().then(offer => pc.setLocalDescription(offer));
  pc.onicecandidate = event => {
    if (event && event.candidate) {
      let candidate = event.candidate.candidate;
      let ipMatch = candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3})/);
      if(ipMatch){
        callback(ipMatch[1]);
        pc.close();
      }
    }
  };
}

getLocalIP(ip => {
  document.getElementById("local-ip").innerText = "IP Local: " + ip;

});
