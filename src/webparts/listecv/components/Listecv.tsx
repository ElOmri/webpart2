import * as React from 'react';
import styles from './Listecv.module.scss';
import { IListecvProps } from './IListecvProps';
import Calendar from 'react-calendar';
//var DateTimeField = require('react-bootstrap-datetimepicker').DateTimeField;
import * as $ from "jquery"
import Slider from "react-slick";
import { savePDF } from '@progress/kendo-react-pdf';
import {Template2} from "..//components/Template2/template2"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { AadTokenProvider } from '@microsoft/sp-http';      
import { tasks } from '@microsoft/teams-js';
import { ComboBox, Fabric, IComboBoxOption, mergeStyles, SelectableOptionMenuItemType, Toggle } from 'office-ui-fabric-react/lib/index';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBarButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Link } from 'office-ui-fabric-react/lib/Link';
/*import { sp } from "@pnp/sp";
import { SPFetchClient } from "@pnp/nodejs";*/
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Element } from '@progress/kendo-drawing/dist/npm/shapes';
import StarRateIcon from '@material-ui/icons/StarRate';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export interface IState{
  showPanel: boolean;
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
    };
     
  }
  public Image;
  public _image: HTMLElement;

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

  private requestToken(_ComponenetContext):void {  
//https://cors-anywhere.herokuapp.com/

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

/*private addFavourite():void
{
  this.
}*/
      
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
    <div><img onMouseEnter={this._onShow.bind(this)} onMouseOut={this._onDismiss.bind(this)}   src={!JSON.parse(localStorage.getItem("listeid")).includes(element.userPrincipalName)?'https://image.flaticon.com/icons/svg/149/149220.svg':'https://image.flaticon.com/icons/svg/148/148839.svg'} onClick={()=>{this.setFavourite(element.userPrincipalName)}} width={50} height={50} style={{ float : "right"}} />
   
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
 
}

private handleDayChange(selectedDay, modifiers, dayPickerInput) {
  const input = dayPickerInput.getInput();
  this.setState({
    selectedDay,
    isEmpty: !input.value.trim(),
    isDisabled: modifiers.disabled === true,
  });
}
 private getDate(): Date
 {
   let now = new Date();
   now.setDate(now.getDate()+50)
   return now
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

  private getCalender():any
  {
    let x=[];
    if(this.state.userevent!=null){
    this.state.userevent.value.forEach(element => {

     x.push(element.start.dateTime);
    });
alert(x)
    return x;
  }else
  {
    let x=[];
    x.push(new Date());
return x;
  }
    
  }

  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  };
  public render(): React.ReactElement<IListecvProps> {
  {}
  
  const exampleImageProps: IImageProps = { height: 'auto' , width: 'auto' , src: 'https://media.giphy.com/media/2vkoYTKBWuGxOnDHKO/giphy.gif'   };
   const _ComponenetContext = this;
   const { isTeachingBubbleVisible } = this.state;
   const state = this.state;
   const speed: number = 500;
   const { selectedDay, isDisabled, isEmpty } = this.state;
   var settings = {
    dots: true,
    adaptiveHeight : true,
    width : 1200,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    
   
    
    beforeChange: (m,x,current, next) =>
    setTimeout(() => this.setState(prevState => ({ ...prevState, currentSlide: next })), 700, 

    
    )
   

  };
   
  {this.getlisteID(_ComponenetContext,_ComponenetContext.state.token)}
  
if(this.element()=="")
{ 
  return <div>Loading ..</div>
}
    return (
    <div>
 

      
     
      <div>
      
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
      <div>
      {isTeachingBubbleVisible? (
          <div>
            <TeachingBubble
              targetElement={this._image}
              hasCondensedHeadline={true}
              hasCloseIcon={false}
              headline="Make this one of my favourite "
              illustrationImage={exampleImageProps}
              onDismiss={this._onDismiss.bind(this)}
              ignoreExternalFocusing={true}
            >
                Favourite persons are stored in browser cache
            </TeachingBubble>
          </div>
        ) : null}
</div>
     <div ref={Image => (this._image = Image!)} ></div>
     <Panel
          isOpen={this.state.showPanel}
          onDismiss={this._hidePanel}
          type={PanelType.extraLarge}
          headerText="Contact"
          closeButtonAriaLabel="Close"
        >
        <TextField label="Nom" type="text" iconProps={{ iconName: 'contact' }}  required /> 
        <TextField label="Prénom" type="text" iconProps={{ iconName: 'contactinfo' }}  required /> 
        <TextField label="Company Name" type="text" iconProps={{ iconName: 'backlogboard' }}  required />
        <TextField label="Email" type="Email" iconProps={{ iconName: 'mail' }}  required />
        <MaskedTextField required label="Numéro Telephone" mask="\(+216)  99 - 999 - 999" iconProps={{ iconName: 'phone' }}  />
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
       
        <p>
          {isEmpty && 'Please type or pick a day'}
          {!isEmpty && !selectedDay && 'This day is invalid'}
          {selectedDay && isDisabled && 'This day is disabled'}
          {selectedDay &&
            !isDisabled &&
            `Jour de meeting favori : ${selectedDay.toLocaleDateString()}`}
        </p>
        <DayPickerInput
        format={'D/M/YYYY'}
          value={selectedDay}
          onDayChange={this.handleDayChange.bind(this)}
          dayPickerProps={{
            selectedDays: selectedDay,
            
            disabledDays:
            [
              
         new Date(this.getCalender()[0])
              ,
              new Date("2019-04-28T01:20:44.1030000")
             ,
             
             
          
    
               {
              daysOfWeek: [0, 6],
              
               before: new Date(),
               after : this.getDate()      
          }]
        }}
        />
<Label>Warning :</Label>
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
        <Link href="www.google.fr">le règlement du societé </Link>
      </MessageBar>
        </Panel>
</div>
    );

  }
  
}
