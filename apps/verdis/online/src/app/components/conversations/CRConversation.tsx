const CRConversation = ({
  messages = [],
  userMap = {
    verdis: { name: 'VerDIS-Online', color: '#006D71' },
    SteinbacherD102: { name: 'Dirk Steinbacher', color: '#006D71' },
    citizen: {},
    system: {},
  },
  width,
  background,
  hideSystemMessages = false,
}) => {
  const sMsgs = messages.sort((a, b) => a.timestamp - b.timestamp);

  const sMsgsWithWelcomeMessage: any = [];
  sMsgsWithWelcomeMessage.push({
    typ: 'CLERK',
    timestamp: 0,
    name: 'verdis',
    nachricht:
      'Sehr geehrte*r Nutzer*in, hier haben Sie die Möglichkeit Änderungen an Ihren Flächen zu begründen und allgemeine Anmerkungen sowie Belege hinzuzufügen.',
  });
  sMsgsWithWelcomeMessage.push(...sMsgs);

  return <div>CRConversation</div>;
};

const systemmessage = (sysMsgConf) => {
  if (sysMsgConf.type !== undefined) {
    switch (sysMsgConf.type) {
      case 'CHANGED':
        return `Ihr Sachbearbeiter hat die Fläche ${sysMsgConf.flaeche} geändert.`;
      case 'REJECTED':
        return `Ihr Sachbearbeiter hat Änderungen an der Fläche ${sysMsgConf.flaeche} abgelehnt.`;
      case 'NOTIFY':
        return undefined;
      case 'STATUS': {
        switch (sysMsgConf.status) {
          case 'NONE':
          case 'FINISHED':
            return 'Ihr Sachbearbeiter hat die Bearbeitung abgeschlossen.';
          case 'PROCESSING':
            return 'Ihr Sachbearbeiter hat die Bearbeitung aufgenommen.';
          case 'PENDING':
            return undefined;
          default:
            return 'unbekannter Status' + sysMsgConf.status;
        }
      }
      case 'SEEN':
        return undefined;

      default: {
        return 'Fehlerhafte Systemnachricht:' + JSON.stringify(sysMsgConf);
      }
    }
  }
};

export default CRConversation;
