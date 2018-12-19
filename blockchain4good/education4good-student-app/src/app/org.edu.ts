import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.edu{
   export class Student extends Participant {
      studId: string;
      name: string;
      country: string;
      description: string;
      courseList: Course[];
      rfps: RequestForProposal[];
      contr: EducationalContract[];
   }
   export class Investor extends Participant {
      investorId: string;
      name: string;
      investorProfile: string;
      contr: EducationalContract[];
      rfps: RequestForProposal[];
   }
   export class University extends Participant {
      uniId: string;
      name: string;
   }
   export class Course extends Asset {
      courseId: string;
      courseCost: string;
      courseDuration: string;
      courseTitle: string;
      uniId: University;
   }
   export class RequestForProposal extends Asset {
      courseId: Course;
      studId: Student;
      rfpId: string;
      status: string;
      fundAmt: number;
      benefits: string;
      timelines: string;
      intrestedParty: Investor[];
      selectedInvestor: Investor;
   }
   export class EducationalContract extends Asset {
      contractId: string;
      contractType: string;
      status: string;
      fundAgreed: number;
      fundReleased: number;
      courseId: Course;
      studId: Student;
      investorId: Investor;
   }
   export class RequestForSponsorship extends Transaction {
      rfp: RequestForProposal;
   }
   export class ReqForSponsorEvent extends Event {
      rfp: RequestForProposal;
   }
   export class ExpressInterest extends Transaction {
      rfp: RequestForProposal;
      investorId: string;
   }
   export class InterestExpressedEvent extends Event {
      rfp: RequestForProposal;
      investorId: string;
   }
   export class CloseRfp extends Transaction {
      rfp: RequestForProposal;
      investorId: string;
   }
   export class NotifyNewContractEvent extends Event {
      rfp: RequestForProposal;
      eduContract: EducationalContract;
   }
// }
