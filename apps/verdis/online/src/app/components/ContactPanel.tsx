import { panelTitles } from "@carma-collab/wuppertal/verdis-online";
interface ContactProps {
  contact?: any;
}

const ContactPanel = ({ contact }: ContactProps) => {
  let _contact;
  if (!contact) {
    _contact = {
      anrede: "Herr",
      vorname: "Dirk",
      nachname: "Steinbacher",
      telefon: "+49-202-563 5794",
      mail: "dirk.steinbacher@stadt.wuppertal.de",
      image: "SteinbacherD102.png",
    };
  } else {
    _contact = contact;
  }

  let styleOverride = {
    marginBottom: "5px",
    width: "100%",
  };

  if (_contact.image) {
    styleOverride = Object.assign(styleOverride, {
      backgroundImage: 'url("/images/contacts/' + _contact.image + '")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "64px 64px",
      backgroundPosition: "right 10px top 15px",
    });
  }

  return (
    <div
      style={{
        ...styleOverride,
        minHeight: 20,
        backgroundColor: "#f5f5f5",
        border: "1px solid #e3e3e3",
        padding: 9,
        borderRadius: 3,
        height: "auto",
      }}
    >
      <h4>{panelTitles.contactTitle}</h4>
      <h5>
        {_contact.anrede} {_contact.vorname} {_contact.nachname}{" "}
      </h5>
      <h6>
        Telefon: <a href={"tel:" + _contact.telefon}>{_contact.telefon} </a>
      </h6>
      <h6>
        eMail: <a href={"mailto:" + _contact.mail}>{_contact.mail} </a>
      </h6>
    </div>
  );
};

export default ContactPanel;
