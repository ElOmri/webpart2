import * as React from 'react';
import styles from './Listecv.module.scss';
import { IListecvProps } from './IListecvProps';
//var DateTimeField = require('react-bootstrap-datetimepicker').DateTimeField;
import * as $ from "jquery"
import Slider from "react-slick";
import { savePDF } from '@progress/kendo-react-pdf';
import {Template2} from "..//components/Template2/template2"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DateUtils } from 'react-day-picker'
import { ComboBox, Fabric, IComboBoxOption, mergeStyles, SelectableOptionMenuItemType, Toggle } from 'office-ui-fabric-react/lib/index';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import StarRateIcon from '@material-ui/icons/StarRate';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import DayPicker from 'react-day-picker';
import { hiddenContentStyle} from 'office-ui-fabric-react/lib/Styling';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import 'react-day-picker/lib/style.css';
import {  ITextFieldProps } from 'office-ui-fabric-react/lib/TextField';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import SimpleCrypto from "simple-crypto-js";
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { getTheme, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
export interface IState{
  titleRequest: any;
  showPanel: boolean;
  showPanel2:boolean;
  responses:any[]
  modeleTemplate:string
  token:string
  favoriID: string[]
  favoriUsersPrincipalName : string[],
  mode :boolean;
  isFavorite:boolean;
  alignment:string;
  isTeachingBubbleVisible?: boolean;
  autoComplete: boolean;
  allowFreeform: boolean;
  selectedDay: Date;
      isEmpty: boolean;
      isDisabled: boolean;
  userevent: any;
  selectedDays: Date[],
  identifiant:string,
  company:string,
  adresse:string,
  telephone:string,
  password:string,
  password2:string,
  nom:string,
  prenom:string,
  isCalloutVisible: boolean;
  hideDialog: boolean;
  hideDialog2: boolean;
login : string;
pw:string;
signRequest:any;
loggedinUser:string;
}


const INITIAL_OPTIONS: IComboBoxOption[] = [
  { key: 'Header1', text: 'A long terme', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Recrutement <2ans' },
  { key: 'B', text: 'Recrutemenet >2ans', disabled: true },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'A court terme', itemType: SelectableOptionMenuItemType.Header },
  { key: 'C', text: "Maintenance" },
  { key: 'D', text: 'Testeur' },
  { key: 'E', text: 'Projet' },
];

const wrapperClassName = mergeStyles({
  display: 'flex',
  selectors: {
    '& > *': { marginRight: '20px' },
    '& .ms-ComboBox': { maxWidth: '500px' }
  }
});


import { IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';
const stylesx = (theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing.unit,
    },
  });
  export interface Propsx extends WithStyles<typeof stylesx> {}
  
export default class Listecv extends React.Component<IListecvProps, IState> {
 

  
  constructor(props :IListecvProps,state :  IState )
  { super(props);
    
    if (typeof(Storage) !== "undefined") {
      let storedNames= [];
      let storedIds=[];
      if(JSON.parse(localStorage.getItem("names")) ==undefined )
      {
      localStorage.setItem("names", JSON.stringify(storedNames));
      
      }
      if(JSON.parse(localStorage.getItem("listeid")) ==undefined )
      {
      localStorage.setItem("listeid", JSON.stringify(storedIds));
     
      }else
      {
      
      }   
    }
    this.state = { 
      loggedinUser:"",
      signRequest:null,
      login:"",
      pw:"",
      hideDialog: false,
      hideDialog2:true,
      titleRequest: ['default'],
      isCalloutVisible: false,
      adresse:"",
      company:"",
      nom:"",
      prenom:"",
      identifiant:"",
      password:"",
      password2:"",
      telephone:"",
      showPanel2:false,
      userevent:null,
       showPanel: false,
      isTeachingBubbleVisible: false,
      alignment:"left",
  responses: [],
        mode :false,
        isFavorite:false,
  token:null,
  modeleTemplate:null,
  favoriID:null,
  favoriUsersPrincipalName:[],
  autoComplete: false,
    allowFreeform: true,
    selectedDay: null,
      isEmpty: true,
      isDisabled: false,
      selectedDays: [],
    };
     
  }
  public Image;
  public _image: HTMLElement;
  private _descriptionId: string = getId('description');
  private _iconButtonId: string = getId('iconButton');
  private _onDismiss() {
    this.setState({
      isTeachingBubbleVisible: false
    });
 
  }

  private _onShow() {
    this.setState({
      isTeachingBubbleVisible: true
    });
   
  }

  private addUser(_componentContext,token,identifiant,companyName,password,adresse,telephone,nom,prenom)
  {
    var _secretKey = "elomri";
 
var simpleCrypto = new SimpleCrypto(_secretKey);
var cryptedpassword = simpleCrypto.encrypt(password);
    var x ={"fields": {
      "Title": identifiant,
      "company" : companyName,
      "password": cryptedpassword,
      "adresse" : adresse,
      "telephone": telephone,
      "nom" : nom,
      "email": prenom
   }}
    $.ajax({  
      "async": true,  
      "crossDomain": true,  
      "url": "https://graph.microsoft.com/beta/sites/root/lists/cec630c7-c1f1-4025-a8b2-d77167035e5d/items/", 
      "method": "POST",  
      "headers": {  
          "content-type": "application/json"  ,
         
      },  
      "data": JSON.stringify(x),  
      beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + token); } ,
      success: function(response) {  
      }  

  })  
  }

  private _onRenderLabel = (props: ITextFieldProps): JSX.Element => {
    return (
      <>
        
          <span>{props.label}</span>
          <IconButton
            id={this._iconButtonId}
            iconProps={{ iconName: 'Info' }}
            title="Info"
            ariaLabel="Info"
            onClick={this._onIconClick}
            styles={{ root: { marginBottom: -3 } }}
          />
      
        {this.state.isCalloutVisible && (
          <Callout
            target={'#' + this._iconButtonId}
            setInitialFocus={true}
            onDismiss={this._onDismiss2}
            ariaDescribedBy={this._descriptionId}
            role="alertdialog"
          >
            
              <span id={this._descriptionId}>Jamais partager l'identifiant</span>
              <DefaultButton onClick={this._onDismiss2}>Close</DefaultButton>
        
          </Callout>
        )}
      </>
    );
  };

  private _onIconClick = (): void => {
    this.setState({ isCalloutVisible: !this.state.isCalloutVisible });
  };

  private _onDismiss2 = (): void => {
    this.setState({ isCalloutVisible: false });
  };


  handleDayClick(day, { selected }) {
    const { selectedDays } = this.state;

    if (selected) {
     

      const selectedIndex = selectedDays.findIndex(selectedDay =>
       (selectedDay.getTime() == day.getTime())
    
      );
      selectedDays.splice(selectedIndex, 1);
    } else {
      selectedDays.push(day);
    }
    this.setState({ selectedDays });
  }

  private requestToken(_ComponenetContext):void {  
    $.ajax({  
      "async": true,  
      "crossDomain": true,  
      "url": "https://cors-anywhere.herokuapp.com/https://login.microsoftonline.com/dc21cc0b-fd43-41ea-b03b-75e4fcb3aec9/oauth2/v2.0/token", // Pass your tenant name instead of sharepointtechie    
      "method": "POST",  
      "headers": {  
          "content-type": "application/x-www-form-urlencoded"  ,
         
      },  
      "data": {  
          "grant_type": "client_credentials",  
          "client_id ": "6fc6e6f6-4bd1-4392-991d-e7aae8bbb357",    
          "client_secret": "fikB96{^adcdBNOUYA325@^",
          "scope ": "https://graph.microsoft.com/.default"  
      },  
      success: function(response) {  
      

         _ComponenetContext.setState({
           token:response.access_token
         })
          
      }  

  })  

}  

private _getErrorMessage2 = (value: string): string => {
let x =this.state.titleRequest;
let verif =false;
x.value.forEach(element => {
  if((element.fields.Title)==value)
verif=true

});

  if(verif)
  {
    this.setState(
      {
        identifiant : ""
      }
    )
    return  'identifiant utilisé'
  }
  else
  {
    return ''
  }
  
};

private Deconnect()
{
this.setState(
  {
    loggedinUser:"",
    adresse:"",
    company:"",
    telephone:"",
    nom:"",
    prenom:""
  }
)
}

private _getErrorMessage = (value: string): string => {
  if(value!=this.state.password)
  {
    this.setState(
      {
        password2 : ""
      }
    )
  }
  return value == this.state.password  ? '' : `les deux mot de passe ne sont pas identiques.`;
};
    private getCurrentUser(componentContext,token) :boolean{
  if(componentContext.state.alignment=="left")
  {
    componentContext.setState({
      alignment:"right"
          })
  }
  else
  {
    componentContext.setState({
      alignment:"left"
          })
  }
      this.setState({
        mode: !this.state.mode
            })
      
      let verif=false
  componentContext.state.favoriUsersPrincipalName.forEach(element => {
    var xhr = new XMLHttpRequest();
      xhr.open('GET', "https://graph.microsoft.com/beta/users/"+element+"/?$select=displayName,mail,userPrincipalName,businessPhones,city,country,officeLocation,streetAddress,skills,schools, aboutMe,interests,pastProjects,companyName,department,jobTitle,responsibilities", true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
     
      let  Response=null;
      xhr.onreadystatechange = function (a:any) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          Response=(JSON.parse(xhr.responseText));
        
          let x = componentContext.state.responses;
                      
          if(!x.includes(Response))
          {
            x.push(Response)
           
            componentContext.setState(
              {
                responses : x
              }
            )
          }
          
        verif=true
      };
    }
      xhr.send();
     
  });
      
      return verif
    }

    private getlisteID(componentContext,token) :void{
     let Table=[]
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://graph.microsoft.com/beta/sites/root/lists/227d22af-04e8-44ea-9acc-5e88a5652db3/items/?$select=id', true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
     
      let  Response=null;
      xhr.onreadystatechange = function (a:any) {
        if (xhr.readyState === 4 && xhr.status === 200) {
          Response=(JSON.parse(xhr.responseText));
        
           Response.value.forEach(element => {
            {
             var xhr2 = new XMLHttpRequest();
              
              xhr2.open('GET', "https://graph.microsoft.com/beta/sites/root/lists/FavoriUsers/items/"+element.id+"/fields/?$select=Title", true);
              xhr2.setRequestHeader('Authorization', 'Bearer ' + token);
 
              let  Response2=null;
              xhr2.onreadystatechange = function (a:any) {
                if (xhr2.readyState === 4 && xhr2.status === 200) {
                  Response2=(JSON.parse(xhr2.responseText));
                      let x = componentContext.state.favoriUsersPrincipalName;
                      
                      if(!x.includes(Response2.Title))
                      {
                        x.push(Response2.Title)
                       
                        componentContext.setState(
                          {
                            favoriUsersPrincipalName : x
                          }
                        )
                      }
                 };
            }
              xhr2.send();
          }
           });
         };
    }
    xhr.send();

      }

  private getidentifiant(token,componentContext)
      {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://graph.microsoft.com/beta/sites/root/lists/cec630c7-c1f1-4025-a8b2-d77167035e5d/items?expand=fields(select=Title)", true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        let  Response=null;
        xhr.onreadystatechange = function (a:any) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            Response=(JSON.parse(xhr.responseText));
            
            componentContext.setState(
                {
                  titleRequest : Response
                }
              )
            
            
         
        };
      }
        xhr.send();
      }
      private getevents(element,token,componentContext)
      {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://graph.microsoft.com/beta/users/"+element+"/events?$select=subject,start", true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        let  Response=null;
        xhr.onreadystatechange = function (a:any) {
          if (xhr.readyState === 4 && xhr.status === 200) {
            Response=(JSON.parse(xhr.responseText));
            
            componentContext.setState(
                {
                  userevent : Response
                }
              )
            
            
         
        };
      }
        xhr.send();
      }

private Slide()
{

  $("#slider").empty()
let x =[];
if(this.state.mode){
  const filteredArr = this.state.responses.reduce((acc, current) => {
    const x = acc.find(item => item.displayName === current.displayName);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  if(this.state.responses.length>0){
  
    filteredArr.forEach(element => {
    x.push([
<div>
      <div ref={(image) => this.Image = Image}
			id="divToPrint" className="mt4" style={{
				width: 'auto',
				minHeight: 'auto',
				marginLeft: 'auto',
				marginRight: 'auto',
				}}>
    <div >
    <Template2 
templatemodele="" 
displayName={element.displayName}
mail={element.mail}
userPrincipalName={element.userPrincipalName}
businessPhones={element.businessPhones}
city={element.city}
country={element.country}
officeLocation={element.officeLocation}
streetAddress={element.streetAddress}
skills={element.skills}
schools={element.schools}
aboutMe={element.aboutMe}
interests={element.interests}
pastProjects={element.pastProjects}
companyName={element.companyName}
department={element.department}
jobTitle={element.jobTitle}
responsibilities={element.responsibilities}
    /></div><DefaultButton
    text="Export PDF"
  onClick={() => { savePDF(this.Image); }}
/>  
<PrimaryButton
            text="Contact"
            onClick={()=>this._showPanel(element.userPrincipalName,this.state.token,this)}
          
          />
         
    <div><img    src={!JSON.parse(localStorage.getItem("listeid")).includes(element.userPrincipalName)?'https://image.flaticon.com/icons/svg/149/149220.svg':'https://image.flaticon.com/icons/svg/148/148839.svg'} onClick={()=>{this.setFavourite(element.userPrincipalName)}} width={50} height={50} style={{ float : "right"}} />
   
    </div>
    </div>
    </div>
  ])
  });
 
  return x  
}
}
else
{
  let favouri=JSON.parse(localStorage.getItem("listeid"));
  const filteredArr = this.state.responses.reduce((acc, current) => {
    const x = acc.find(item => item.displayName === current.displayName);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  if(this.state.responses.length>0){
    filteredArr.forEach(element => {

if(favouri.includes(element.userPrincipalName))
{
      x.push([
  <div>
        <div ref={(image) => this.Image = Image}
        id="divToPrint" className="mt4" style={{
          width: 'auto',
          minHeight: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          }}>
      <div >
      <Template2 
  templatemodele="" 
  displayName={element.displayName}
  mail={element.mail}
  userPrincipalName={element.userPrincipalName}
  businessPhones={element.businessPhones}
  city={element.city}
  country={element.country}
  officeLocation={element.officeLocation}
  streetAddress={element.streetAddress}
  skills={element.skills}
  schools={element.schools}
  aboutMe={element.aboutMe}
  interests={element.interests}
  pastProjects={element.pastProjects}
  companyName={element.companyName}
  department={element.department}
  jobTitle={element.jobTitle}
  responsibilities={element.responsibilities}
      /></div><DefaultButton
        text="Export PDF"
      onClick={() => { savePDF(this.Image); }}
    />  
    <PrimaryButton
            text="Contact"
            onClick={()=>this._showPanel(element.userPrincipalName,this.state.token,this)}  
          
          />
      </div>
      </div>
    ])
  }
    });
   
    return x  
  }
}
}





private setFavourite(namex):void
{
 


  let x =JSON.parse(localStorage.getItem("listeid"));
  if(!x.includes(namex))
  {
    x.push(namex)
    localStorage.setItem("listeid", JSON.stringify(x));

   

  } 
  else
  {
      let num =x.indexOf(namex);
      x.splice(num,1);
      localStorage.setItem("listeid", JSON.stringify(x));
 
  }
  this._showDialog2()
    setTimeout( function(){ 
      
      this.setState({ hideDialog2: true });
    }  , 1000 );
}

private handleDayChange(selectedDay, modifiers, dayPickerInput) {
  const input = dayPickerInput.getInput();
  this.setState({
    selectedDay,
    isEmpty: !input.value.trim(),
    isDisabled: modifiers.disabled === true,
  });
}
 
private requestSignin(componentContext,token)
{
  if(componentContext.state.signRequest==null)
  {
  var  xhr = new XMLHttpRequest();
  xhr.open('GET', "https://graph.microsoft.com/beta/sites/root/lists/cec630c7-c1f1-4025-a8b2-d77167035e5d/items?expand=fields", true);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  let  Response=null;
  xhr.onreadystatechange = function (a:any) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      Response=(JSON.parse(xhr.responseText));
      
      componentContext.setState(
          {
            signRequest: Response
          }
        )
      
      
   
  };
}
  xhr.send();
}

}


 private signin(componentContext,token)
 {
   let login= this.state.login;
   let password = this.state.pw;
   let verif=true;
   this.state.signRequest.value.forEach(element => {
     
        if(element.fields.Title==login)
        {
          let password2=element.fields.password;
          var _secretKey = "elomri";
var simpleCrypto = new SimpleCrypto(_secretKey);
var decryptedPassword = simpleCrypto.decrypt(password2);

if(password==decryptedPassword)
{
  componentContext.setState(
    {
      loggedinUser: login,
      adresse:element.fields.adresse,
      company:element.fields.company,
      email:element.fields.email,
      telephone:element.fields.telephone,
      hideDialog:true
    }
  )
  verif=false;
}


        }

   });
if(verif)
{
  alert("verifier le mot de passe ou login")
}
 }
  
    private getTemplateModele(componentContext,token)
    {
     let verif=false
      var xhr = new XMLHttpRequest();
      xhr.open('GET', "https://graph.microsoft.com/beta/sites/root/lists/3a8997c9-1f53-4250-b633-c12b5cc267ca/items/1/?$value");
   
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
     
      let  Response=null;
      xhr.onreadystatechange = function (a:any) {
        if (xhr.readyState === 4 && xhr.status === 200) {
      
      };
    }
      xhr.send();
      return verif

}
    

    public componentDidMount(): void {
      this.requestToken(this)

    }
    private element():any
    {
      if(this.state.token)
      {
       
      return this.state.token
      }
      else
      return ""
    }
   public componentWillUpdate () : void
   {

   }
   private _showPanel (element,token,componentContext) {
     this.getevents(element,token,componentContext);
    this.setState({ showPanel: true });
  };

  private _showPanel2 (componentContext,token) {
    if(this.state.loggedinUser=="")
    {
   this.getidentifiant(token,componentContext)
   this.setState({ showPanel2: true });
    }
    else
    {
      alert("veuillez deconnecter")
    }
 };

  private getCalender():Date[]
  {
    let x=[];
    if(this.state.userevent!=null){

    this.state.userevent.value.forEach(element => {

     x.push(new Date(element.start.dateTime));
    });
    
    for (let index = 1; index < (new Date().getDate()) ; index++) {
     
      x.push(new Date(new Date().getFullYear(),new Date().getMonth(),index));
    }

    return x;
  }else
  {
    let x=[];
    x.push(new Date());
return x;
  }
  }



  private _showDialog = (): void => {
    this.setState({ hideDialog: false });
  };

  private _closeDialog = (): void => {
    this.setState({ hideDialog: true });
  };
  private _showDialog2 = (): void => {
    this.setState({ hideDialog2: false });
  };

  private _closeDialog2 = (): void => {
    this.setState({ hideDialog2: true });
  };


  private _hidePanel2 = (): void => {
    this.setState({ showPanel2: false });
  };
  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  };
  public render(): React.ReactElement<IListecvProps> {
  {}
  const disabled= this.getCalender();
  
  const exampleImageProps: IImageProps = { height: 'auto' , width: 'auto' , src: 'https://media.giphy.com/media/2vkoYTKBWuGxOnDHKO/giphy.gif'   };
   const _ComponenetContext = this;
   const { isTeachingBubbleVisible } = this.state;
   const state = this.state;
   const speed: number = 500;
   const { selectedDay, isDisabled, isEmpty } = this.state;
   var settings = {
    dots: true,
    adaptiveHeight : false,
    width : 1200,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    
    
   
    
    beforeChange: (m,x,current, next) =>
    setTimeout(() => this.setState(prevState => ({ ...prevState, currentSlide: next })), 700, 

    
    )
   

  };
   
  {this.getlisteID(_ComponenetContext,_ComponenetContext.state.token)}
  {
    this.requestSignin(_ComponenetContext,_ComponenetContext.state.token);}
if(this.element()=="")
{ 
  return <div>Loading ..</div>
}
    return (
    <div>
 

      
     
      <div>
      <Dialog
        
          hidden={this.state.hideDialog2}
          onDismiss={this._closeDialog2}
          dialogContentProps={{
              
            type: DialogType.largeHeader,
            title: 'Favouri',
            subText: 'les profils favouris sont sauvegardés au navigateur',
         
        
          }}
         
          containerClassName={ 'ms-dialogMainOverride ' + styles.textDialog}
 
        >
       <div style={{ width : 230 }} >
        <img  src="https://media.giphy.com/media/6zHB86JLnQHFS/giphy.gif" />
          
          </div>
</Dialog>
        <div style={{float:"right", paddingTop:50}}>
      <PrimaryButton
            text="Créer un compte"
            onClick={()=>this._showPanel2(this,this.state.token)}
          style={{ paddingRight :20, paddingLeft: 20}}
          />
<span>  </span>
            <PrimaryButton
            text="Connexion"
            onClick={()=>this._showDialog()}
            style={{paddingRight:20 , paddingLeft:20}}
          />
</div>
          {(this.state.loggedinUser!="") ?<div style={{float:"left"}} ><span style={{ fontWeight:"bold"  }} >  Bonjour </span><span style={{ fontWeight:"bold" , color:"blue" }}> {this.state.loggedinUser}</span><br/><DefaultButton text={"Deconnexion"} onClick={()=>this.Deconnect()} /></div>:<p></p>}
        <ToggleButtonGroup  style={{ paddingRight: 290 , paddingLeft : 290 }} value={_ComponenetContext.state.alignment}  exclusive onChange={()=>this.getCurrentUser(_ComponenetContext,_ComponenetContext.state.token)} >
      <ToggleButton value="left">
      <StarRateIcon  style={{ float: "left" , width: "auto"}} fontSize={ "large"} />
              </ToggleButton>
              <ToggleButton style={{ float: "right" , width: "auto"}}  value="right">
              <SupervisorAccountIcon fontSize={ "large"} /> 
              </ToggleButton>
      </ToggleButtonGroup>
      </div>
     <h1 style={{ textAlign : "center" , color : "blue" }} >Liste des cv</h1>
     <Slider  {...settings} id="slider">
        {this.Slide()}
      </Slider>
      <br/>
      <br/>
     
     
     <Panel
          isOpen={this.state.showPanel}
          onDismiss={this._hidePanel}
          type={PanelType.extraLarge}
          headerText="Contact"
          closeButtonAriaLabel="Close"
        >
        
        <Fabric className={wrapperClassName}>
        <ComboBox
          required
          label="Type de besoin"
          key={'' + state.autoComplete + state.allowFreeform }
          allowFreeform={state.allowFreeform}
          autoComplete={state.autoComplete ? 'on' : 'off'}
          options={INITIAL_OPTIONS}
        />   <span    onClick={() => {
          this.setState({ allowFreeform: !this.state.allowFreeform });
        } 
      }> 
        <Toggle
          label="FreeForm"
          checked={state.allowFreeform}
       
        />
        </span>
        
        <span onClick={() => {
            this.setState({ autoComplete: !this.state.autoComplete });
          }}> 
        <Toggle
          label="Auto-complete"
          checked={state.autoComplete}
        />
        </span>
      </Fabric>
        <TextField required label="Besoin" multiline rows={3} iconProps={{ iconName: 'glasses' }} />
      
      
       

        <DayPicker
      
      selectedDays={this.state.selectedDays}
          onDayClick={this.handleDayClick.bind(this)}
      fromMonth={new Date()}
      disabledDays={
        disabled   
  }
    />
    

<Label>NB :</Label>
      <MessageBar
        onDismiss={this._hidePanel}
        dismissButtonAriaLabel="Close"
        messageBarType={MessageBarType.warning}
        ariaLabel="Aria help text here"
        actions={
          <div>
            <MessageBarButton onClick={()=>alert("oui") }>Envoyer Email</MessageBarButton>
            <MessageBarButton onClick={()=>this._hidePanel}>Annuler</MessageBarButton>
          </div>
        }
      >
      J'ai lu et j'accepte le règlement du societé .
      <br/>
        <Link href="#">le règlement du societé </Link>
      </MessageBar>
        </Panel>
<Panel
 isOpen={this.state.showPanel2}
 onDismiss={this._hidePanel2}
 type={PanelType.extraLarge}
 headerText="Sign UP"
 closeButtonAriaLabel="Close"

>
<form onSubmit={  ()=>this.addUser(this,this.state.token,this.state.identifiant,this.state.company
              ,this.state.password,this.state.adresse,this.state.telephone,this.state.nom,this.state.prenom)} >
<TextField label="Email" type="email" iconProps={{ iconName: 'mail' }} value={this.state.identifiant} onBlur={(value)=>this.setState({identifiant: value.target.value})} validateOnLoad={false} onGetErrorMessage={this._getErrorMessage2} validateOnFocusIn validateOnFocusOut onRenderLabel={this._onRenderLabel.bind(this)} required />
<TextField label="Nom" type="text" iconProps={{ iconName: 'contact' }} value={this.state.nom} onBlur={(value)=>this.setState({nom: value.target.value})} required />
<TextField label="Prenom" type="text" iconProps={{ iconName: 'contact' }} value={this.state.prenom} onBlur={(value)=>this.setState({prenom: value.target.value})} required />
<TextField label="adresse" type="text" iconProps={{ iconName: 'contact' }} value={this.state.adresse} onBlur={(value)=>this.setState({adresse: value.target.value})}  required />
<TextField label="Nom du societé" type="text" iconProps={{ iconName: 'backlogboard' }} value={this.state.company} onBlur={(value)=>this.setState({company: value.target.value})} required />
<TextField label="Mot de passe" type="password" iconProps={{ iconName: 'backlogboard' }} value={this.state.password} onBlur={(value)=>this.setState({password: value.target.value})} required />
<TextField label="Confirmation mot de passe" type="text" iconProps={{ iconName: 'backlogboard' }} value={this.state.password2} onBlur={(value)=>this.setState({password2: value.target.value})} validateOnLoad={false} onGetErrorMessage={this._getErrorMessage} validateOnFocusIn
              validateOnFocusOut required />

<label style={{ fontStyle : 'bold'  }}>Numéro de telephone :</label>
<ReactPhoneInput  required defaultCountry={'tn'}  value={this.state.telephone} onBlur={(value)=>this.setState({telephone: value.target.value})} />
<PrimaryButton
type="submit"
            text="Sign UP"
            style={{float : 'right' }}
          />
          
</form >
</Panel>

<Dialog

          hidden={this.state.hideDialog}
          onDismiss={this._closeDialog}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: 'Connexion',
            subText: 'Veuillez saisir votre identifiant et mot de passe pour se connecter'
          }}
          modalProps={{
            isBlocking: false,
            styles: { main: { maxWidth: 450 } }
          }}
        >
         <TextField label="Identifiant" type="text" iconProps={{ iconName: 'contactinfo' }} value={this.state.login} onBlur={(value)=>this.setState({login: value.target.value})}  onRenderLabel={this._onRenderLabel.bind(this)} required />
         <TextField label="Mot de passe" type="password" iconProps={{ iconName: 'backlogboard' }} value={this.state.pw} onBlur={(value)=>this.setState({pw: value.target.value})} required />
          <DialogFooter>
            <PrimaryButton onClick={()=>this.signin(this,this.state.token)} text="Sign in" />
            <DefaultButton onClick={this._closeDialog} text="Cancel" />
          </DialogFooter>
        </Dialog>

        
</div>
    );

  }
  
}
