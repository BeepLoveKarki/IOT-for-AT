import { Component,OnInit,OnDestroy, ViewChild } from '@angular/core';
import { IonicPage, NavController,AlertController,Platform, Content} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
import {Storage} from '@ionic/Storage';

declare let window:any;
@IonicPage()
@Component({
  selector: 'page-m1',
  templateUrl: 'm1.html',
})
export class M1Page implements OnInit,OnDestroy {
  data:any;
  ip:string;
  num:number;
  m:number;
  txt:string;
  a:number;
  b:number;
  title:string;
  str:string;
  states:Array<String>;
  @ViewChild(Content) content: Content; 
  constructor(public navCtrl: NavController,public alrtCtrl:AlertController,private http:HttpClient,private storage:Storage,private tts:TextToSpeech,private speechRecognition:SpeechRecognition,public platform:Platform) {
    platform.ready().then(()=>{
     this.m=0;
     platform.registerBackButtonAction(()=>{
      if(this.b==1){
        document.removeEventListener("volumedownbutton",this.start, false);
      }
      this.storage.clear();
      this.navCtrl.pop();
     });
    });
  }

  start=()=>{
    this.startrecognition();
  };

  ionViewDidEnter(){
   if(this.a!=1){
    this.getstatus();
    //this.check();
   }
  }
  
  ngOnInit() {
    this.ip='http://192.168.43.29:3000/';
    this.num=0;
    this.str='';
    this.states=new Array();
    this.states.push("Unknown","Unknown","Unknown","Unknown","Unknown");
    this.check();
  }

  check(){
    this.storage.get("mode").then((data)=>{
      if(data=="normal"){
        this.a=1;
        this.title="This mode is for those community who are physically paralyzed and have unability or difficulty in movement from one place to another but are able to easily operate their cell phone ";
        this.getstatus(); 
       }else if(data=="medium"){
       this.a=2;
       this.title="This mode is for those community who are visually impaired and wish to automate household stuffs via sound, also for visually impaired voiceless people we have keypad control";
       this.getstatus();    
     }else{
       this.a=3;
       this.title="This mode is for those community who are unable to even hold their cell phones. We allow them to control this app and the automation process via their eye blinking capability";
       this.getstatus();
     }
   });
  }
  ngOnDestroy() {
    
  }

  startrecognition(){
   if(this.m==0){
    this.tts.speak("Please speak the device name to toggle its state or speak the device name with suffix \"S\" for knowing its state").then(()=>{
      this.speakup();
      this.m++;
     });
   }else{
    this.tts.speak("Speak up").then(()=>{
      this.speakup();
      this.m++;
     });
   }
  }
  speakup(){
    this.voice();
  }

  voice(){
    let a:boolean,b:boolean;
    let d=["light","lite","ite","like","lake"];
    let d1=["lights","lites","ites","likes","lakes"];
    this.speechRecognition.startListening().subscribe( (matches: Array<string>) =>{
      d.forEach((val)=>{
        if(matches.indexOf(val)!=-1){
            a=true;
        }
      });
      d1.forEach((val)=>{
        if(matches.indexOf(val)!=-1){
            b=true;
        }
      });
      if(a==true){
          this.light();
      }else if(b==true){
           this.saystate("light");
      }else{
         this.tts.speak("Sorry!!! Could not recognize the voice input as the required ones!!! Please try again!!!").then((success)=>{
           this.startrecognition();
         });
      }
    } ,(onerror) => {
      let t="Sorry!!! Speech recognition denied on this device";
      this.tts.speak(t);
    });
  }

  getstatus(data?:string,n?:number){
    let a;
    let url=this.ip+"getstatus";
    this.http.get(url).subscribe((res)=>{
      this.states=new Array();
      if(res["light"]==true){
          a="On";
      }else{
          a="Off";
      }
      this.states.push(a,"Unknown","Unknown","Unknown","Unknowm");
      if(data!=undefined){
        if(data=="togglelightstatus"){
          data="light";
        }
        if(n!=undefined){
          this.elaborate(data,n);
        }else{
          this.elaborate(data);
        }
      }else{
      if(this.a==2){
        this.tts.speak("Welcome to the controlling page").then(()=>{
          this.storage.get("type").then((val)=>{
            if(val=="voice"){
              this.b=1;
              document.addEventListener("volumedownbutton",this.start, false); 
            }else{
               this.b=2;
               this.readarduinoper();
            }
          });
        });
      }
      if(this.a==3){ 
        this.tts.speak("Welcome to the controlling page").then(()=>{
          this.readarduinoper();
        }); 
       }
      }
    },(err)=>{
      this.errorit(0);
    });
          
}

  errorit(n:number){
   if(n==0){
     this.txt="We are unable to fetch the devices state. Either you are not connected to the board wifi or the automation board is not on. Please try again after proper configuration. So, we are taking you back to the home page.";
   }else{
     this.txt="We are unable to change the device state. Either you are not connected to the board wifi or the automation board is not on. Please try again after proper configuration. So, we are taking you back to the home page."
   }
    if(this.a==1){
        this.makealert("We are unable to fetch the devices state. Either you are not connected to the board wifi or the automation board is not on. Please try again after proper configuration.",1);
    }else{
       this.tts.speak(this.txt).then(()=>{
          this.navCtrl.pop();
       });
    }
  }

  elaborate(data:string,n?:number){
        let t; 
        switch (data){
          case "light":
           t="The light has been turned "+this.states[0];
           break;
          case "fan":
           t="The fan is now "+this.states[1];
           break;
          case "tv":
           t="The TV has been turned "+this.states[2];
           break;
          case "door":
           t="The door has been "+this.states[3];
           break;
          case "curtain":
           t="The curtain has been "+this.states[4];
           break;
        }
        if(n==undefined){
          this.tts.speak(t);
        }else{
          this.makealert(t);
        }
  }

  saystate(data:string){
    let t; 
    switch (data){
      case "light":
       t="The present state of light is "+this.states[0];
       break;
      case "fan":
       t="The present state of fan is "+this.states[1];
       break;
      case "tv":
       t="The present state of TV is "+this.states[2];
       break;
      case "door":
       t="The present state of door is "+this.states[3];
       break;
      case "curtain":
       t="The present state of curtain is "+this.states[4];
       break;
    }
    this.tts.speak(t);
  }
 
  errorCallback = (message)=> {
    if(message!="Already opened."){
     this.tts.speak(message);
    }
  };

  

  readarduinoper(){
    window.serial.requestPermission((successMessage)=> {
        this.readarduino1();
    },(err)=>{
      this.tts.speak("Sorry!!! No any sensor board found to be connected or may have been denied!!! Please try replugging the board and re starting the app!!!");
    });
  }

  readarduino1(){
    window.serial.open({baudRate: 9600, sleepOnPause: false},(successMessage)=> {
      window.serial.registerReadCallback((data)=>{
          let view = new Uint8Array(data);
          if(view.length >= 1) {
            for(let i=0; i < view.length; i++) {
               if(view[i] == 13) {
                if(this.str.includes("down")){
                  window.serial.write("O",(success)=>{
                   if(success=="OK"){
                     this.str='';
                    if(this.num<4){
                      this.num++;
                    }else{
                       this.num=4;
                    }
                    this.hover();
                   }
                  });
                }else if(this.str.includes("up")){
                  window.serial.write("O",(success)=>{
                    if(success=="OK"){
                      this.str='';
                      if(this.num>0){
                        this.num--;
                      }else{
                         this.num=0;
                      }
                      this.hover();
                    }
                   });
                }
                else if(this.str.includes("ok")){
                  window.serial.write("O",(success)=>{
                    if(success=="OK"){
                       this.str='';
                       this.sendit();
                    }
                  });
                }else if(this.str.includes("back")){
                  window.serial.write("O",(success)=>{
                    if(success=="OK"){
                       this.str='';
                       this.tts.speak("Going back to home page").then(()=>{
                         this.storage.clear();
                         this.navCtrl.pop();
                       });
                    }
                  });
                }
                else{
                  this.str='';
                }
               }else{
                 let temp_str = String.fromCharCode(view[i]);
                 this.str += temp_str;
               }
              
            }
          }
        },
        this.errorCallback
      );
    },
    this.errorCallback
  );
  }

  hover(){
    let xy:any;
    switch(this.num){
      case 0:
       xy=document.getElementById("m1light").getBoundingClientRect();
       this.amn(xy);
       this.saystate("light");
       break;
      case 1:
       xy=document.getElementById("m1fan").getBoundingClientRect();
       this.amn(xy);
       this.saystate("fan");
       break;
      case 2:
       xy=document.getElementById("m1tv").getBoundingClientRect();
       this.amn(xy);
       this.saystate("tv");
       break;
      case 3:
       xy=document.getElementById("m1door").getBoundingClientRect();
       this.amn(xy);
       this.saystate("door");
       break;
      case 4:
       xy=document.getElementById("m1curtain").getBoundingClientRect();
       this.amn(xy);
       this.saystate("curtain");
       break;
    }
  }

  amn(xy){
    setTimeout(()=>{
      this.content.scrollTo(0,xy.top,300);
     },1000);
  }

  sendit(){
    switch(this.num){
      case 0:
       this.light();
       break;
      case 1:
       this.fan();
       break;
      case 2:
       this.tv();
       break;
      case 3:
       this.door();
       break;
      case 4:
       this.curtain();
       break;
    }
  }
 
  makealert(a:string,n?:number){
    let prompt=this.alrtCtrl.create({
     enableBackdropDismiss:false,
     title:"",
     subTitle:a,
     buttons:[{
      text:"OK",
      handler:()=>{
        if(n!=undefined){
          this.storage.clear();
          this.navCtrl.pop();
        }
      }
    }]
   });
   prompt.present();
  }
 
  light(n?:number){
    if(n==undefined){
      this.toggle("togglelightstatus");
    }else{
      this.toggle("togglelightstatus",n);
    }
  }
  fan(n?:number){
    if(n==undefined){
      this.toggle("togglefanstatus");
    }else{
      this.toggle("togglefanstatus",n);
    }
  }
  tv(n?:number){
    if(n==undefined){
      this.toggle("toggletvstatus");
    }else{
      this.toggle("toggletvstatus",n);
    }
  }
  door(n?:number){
    if(n==undefined){
      this.toggle("toggledoorstatus");
    }else{
      this.toggle("toggledoorstatus",n);
    }
  }
  curtain(n?:number){
    if(n==undefined){
      this.toggle("togglecurtainstatus");
    }else{
      this.toggle("togglecurtainstatus",n);
    }
  }

  toggle(n:string,a?:number){
    let url=this.ip+n;
    this.http.get(url).subscribe((res)=>{
      if(res=="done"){
        if(a!=undefined){
          this.getstatus(n,a);
        }else{
          this.getstatus(n);
        }
      }else{
        this.errorit(1);
      }
    },(err)=>{
       this.errorit(1);
    });
 }
}
