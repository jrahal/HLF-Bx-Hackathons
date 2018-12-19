import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.carepay{
   export class Hash extends Asset {
      tx_description: string;
      hash: string;
      pointer: string;
      patient: Patient;
   }
   export abstract class Org extends Participant {
      org_id: string;
      name: string;
   }
   export class Provider extends Org {
      payor: Payor;
   }
   export class Payor extends Org {
      provider: Provider[];
   }
   export class Patient extends Asset {
      patient_id: string;
      provider: Provider;
      payor: Payor;
   }
// }
