import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NavController,AlertController,Platform, Content,Events} from 'ionic-angular';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
import {Storage} from '@ionic/Storage';
import {M1Page} from '../m1/m1';

declare let window:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit,OnDestroy {
  clicked:Array<boolean>;
  a:String;
  str:string;
  @ViewChild(Content) content: Content; 
  constructor(public navCtrl: NavController,private tts:TextToSpeech,private storage:Storage,private alrtCtrl:AlertController,private speechRecognition:SpeechRecognition,public platform:Platform,public events:Events) {
    platform.ready().then(()=>{
      platform.registerBackButtonAction(()=>{
        platform.exitApp();
      });
     });
  }

  domode=()=>{
      this.startpage(0);
  };

  ionViewDidLoad()
  {
     setTimeout(() => {
        this.content.scrollToBottom(300);
     }, 1000);
  }

  ionViewWillEnter(){
    document.addEventListener("volumedownbutton",this.domode,false);
    this.ionViewDidLoad();
   }

   ionViewDidEnter(){
     this.readarduino();
   }

  ngOnInit(){
    this.str='';
    document.addEventListener("volumedownbutton",this.domode,false);
    this.storage.get("mode").then((val)=>{
       if(val!=undefined){
        document.removeEventListener("volumedownbutton",this.domode,false);
        this.navCtrl.push(M1Page);
       }else{
        this.speechavail();
       }
    });
  }

  readarduino1(){
    window.serial.open({baudRate: 9600, sleepOnPause: false},(successMessage)=> {
      window.serial.registerReadCallback((data)=>{
          let view = new Uint8Array(data);
          if(view.length >= 1) {
            for(let i=0; i < view.length; i++) {
               if(view[i] == 13) {
                if(this.str.includes("ok")){
                  window.serial.write("O",(success)=>{
                   if(success=="OK"){
                     this.str='';
                     this.acutemode();
                   }
                  });
                }else if(this.str.includes("ok1")){
                  window.serial.write("O",(success)=>{
                    if(success=="OK"){
                      this.str='';
                      this.startpage(1);
                    }
                   });
                }else{
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
  

  errorCallback = (message)=> {
    if(message!="Already opened."){
      this.tts.speak(message);
    }
  };


  readarduino(){
    window.serial.requestPermission((successMessage)=> {
      if(!successMessage){
        this.makealert("Since sensor board reading is denied, Mode 3 or button controlled mode 2 may not be applicable");
      }else{
        this.readarduino1();
      }
    },(err)=>{
    });
  }


  speechavail(){
    this.speechRecognition.isRecognitionAvailable().then((available:boolean)=>{ //manage this all
      if(available){
       this.speechRecognition.hasPermission().then((hasPermission: boolean) =>{
         if(!hasPermission){
           this.speechRecognition.requestPermission().then(() => {
             this.readarduino();
            },() => {
             let t="Speech recognition denied";
             this.makealert(t);
             this.readarduino();
           });
          }else{
            this.readarduino();
          }
       });
      }else{
       let t="No speech recognition allowed on this device";
       this.makealert(t);
       this.readarduino();
      }
   });
  }

  startpage(n:number){
  if(n==0){
        this.storage.set("mode","medium").then(()=>{
          this.storage.set("type","voice").then(()=>{
            this.tts.speak("Voice mode enabled").then(()=>{
              document.removeEventListener("volumedownbutton",this.domode, false);
              this.navCtrl.push(M1Page);
            });
          });
        });
      }else{
      this.storage.set("mode","medium").then(()=>{
         this.storage.set("type","button").then(()=>{
          this.tts.speak("Button mode enabled").then(()=>{
            document.removeEventListener("volumedownbutton",this.domode, false);
            this.navCtrl.push(M1Page);
          });
        });
       });
      }
  }

  makealert(a:string,n?:number){
    let prompt=this.alrtCtrl.create({
     enableBackdropDismiss:false,
     title:"",
     subTitle:a,
     buttons:["OK"]
   });
   prompt.present();
  }

 modes(n:number){
  switch(n){
    case 1:
     this.storage.set("mode","normal").then(()=>{
      document.removeEventListener("volumedownbutton",this.domode, false);
      this.navCtrl.push(M1Page);
     });
     break;
    case 2:
     this.makeprompt();
     break;
    case 3:
     this.acutemode();
     break;
  }
 }

 acutemode(){
  this.storage.set("mode","acute").then(()=>{
    document.removeEventListener("volumedownbutton",this.domode, false);
      this.navCtrl.push(M1Page);
  });
 }

  ngOnDestroy(){
    
  }


  makeprompt(){
    let prompt=this.alrtCtrl.create({
      enableBackdropDismiss:false,
      title:"",
      subTitle:"Please select one among the following modes",
      buttons:[{
         text:"Done",
         handler:(val)=>{
            if(val=="voice"){
              this.startpage(0);
            }else if(val=="button"){
              this.startpage(1);
            }else{
			   this.makealert("You must select a value");
			}
         }
      },{
        text:"Cancel"
      }]
    });
    prompt.addInput({
       type:"radio",
       label:"Voice controlled",
       value:"voice"
    });
    prompt.addInput({
      type:"radio",
      label:"Button controlled",
      value:"button"
    });
    prompt.present();
  }
  
  
}
