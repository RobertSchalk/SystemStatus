const si = require('systeminformation');
const os = require('os');

var ById = function(id){
    return document.getElementById(id);
}

var totalMemory = ById('totalMemory');
var remainingMemory = ById('remainingMemory');
var percentage = ById('percentage');
var cpuModel = ById('cpuModel');
var OS = ById('OS');
var IPv4Address = ById('IPv4Address');
var IPv6Address = ById('IPv6Address');
var IPv4cidr = ById('IPv4cidr');
var IPv4mask = ById('IPv4mask');
var IPv4mac = ById('IPv4mac');
var cores = ById('cores');
var release = ById('release');
var hostname = ById('hostname');
var homeDirectory = ById('homeDirectory');
var arch = ById('arch');
var tempDirectory = ById('tempDirectory');
var OSType = ById('OSType');
var nodeVersion = ById('nodeVersion');
var electronVersion = ById('electronVersion');

    var remainingPerc = (os.freemem() / os.totalmem());
    var roundedPerc = Math.round(remainingPerc * 100);
//Will plan on making this an async task, to update this task live.
    remainingMemory.append((os.totalmem() - os.freemem()).toLocaleString());
    totalMemory.append(os.totalmem().toLocaleString());
    totalMemory.style.color = '#0f0';
    percentage.append(roundedPerc + "%")
    if(roundedPerc > 50){
        remainingMemory.style.color = '#0f0';
        percentage.style.color = '#0f0';
    } else if(roundedPerc > 30){
        remainingMemory.style.color = '#ff0';
        percentage.style.color = '#ff0';
    } else if(roundedPerc >= 0){
        remainingMemory.style.color = '#f00';
        percentage.style.color = '#f00';
    }

var network = new os.networkInterfaces();
var LAN = network['Local Area Connection* 2'];
var ipv4Info = LAN[1];
var ipv6Info = LAN[0];
var cpu = new os.cpus();
var cpuInfo = cpu[0];
console.log(os.userInfo());
var countCores = function(){
    var i = 0;
    for(i = 0; i < cpu.length; i++){

    }
    return i;
}
console.log(countCores());

IPv4Address.append(ipv4Info['address']);
IPv6Address.append(ipv6Info['address']);
IPv4cidr.append(ipv4Info['cidr']);
IPv4mask.append(ipv4Info['netmask']);
IPv4mac.append(ipv4Info['mac']);
cores.append(countCores());
cpuModel.append(cpuInfo['model']);
cpuModel.style.color = '#0f0';
cpuModel.style.fontSize = '15px';
cores.style.color = '#0f0';
cores.style.display = 'inline';
cores.style.padding = '0';
arch.append(os.arch);
arch.style.color = '#0f0';
arch.style.display = 'inline';
arch.style.padding = '0';
release.append(os.release);
hostname.append(os.hostname);
homeDirectory.append(os.homedir);
tempDirectory.append(os.tmpdir);
tempDirectory.style.FontSize = '10px';
nodeVersion.append(process.versions.node);
electronVersion.append(process.versions.electron);
if(os.type == 'Windows_NT'){
    
OSType.append('Windows');
} else {
OSType.append(os.type);
}



  /*  console.log(os.type());

    console.log(os.cpus());*/