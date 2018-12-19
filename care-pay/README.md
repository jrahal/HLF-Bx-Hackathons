# Team

Zach Gollwitzer, Jad Mubaslat, Sathya Krishnasamy, Sam Walton

# Event 

[Distributed Health Hackathon 2017](https://devpost.com/software/care-pay)

# Problem Statement

Over $1 Trillion each year are wasted in healthcare mainly due to suboptimal clinical care, complexity of record keeping, unaccountability, and over pricing for services in today’s models.

To be able to reduce these losses, a push has been made from Fee for Service to Fee for Value. But to perform Fee for Value,  improved record keeping needs to take place, as well as the coordination of patient information (given proper permissions) among providers participating in what is called an “Integrated Delivery Network”.  But the catch is that this must be done in a manner that REDUCES the total amount of paperwork to be done, and that also provides accountability for participants. And on top of all this, how do you even convince any single member of an IDN to upgrade their software, albeit every single participant? So an ideal solution would enable extensibility of a network over time, but still provide standalone value.

# Solution

That’s where CarePay comes in with it’s 2 key functions. The first function is to automate the tracking, reporting and auditing of records by using Proof of Publication on both the Bitcoin chain using the Tierion API, and in a private hyperledger fabric ledger. This is a critical function, as even if the customer is running as a single node, they can still benefit from the integrity of Bitcoin’s chain. There are programs that will pay providers for a flat fee per patient for simply tracking metrics in a more proveable manner, which can be done in the single node version of CarePay, immediately contributing to the bottom line.
The second function enables shared proactive understanding of benefits, outcomes and payments by publishing not only hashes, but data pointers onto a hyperledger fabric network so that other participants can view the data themselves. Without blockchain, performing this care coordination activity without generating excessive waste and still keeping all members accountable for each other might be an impossible task. This problem practically begs for blockchain.

# Demo

## Care Pay Alpha Network

> This is and Integrated Delivery Network built on the Hyperledger Fabric.

This business network defines:

**Participant**
`Payor`

**Participant**
'Provider'

**Asset**
`Patient`

**Asset**
'Hash'

To demo the business network, please visit the [Hyperledger Cloud based Composer playground](https://composer-playground.mybluemix.net/editor).

Clone the repo locally and enter main directory.

```
mkdir dist
composer archive create -a dist/care-pay.bna --sourceType dir --sourceName .
```

This will create the care-pay.bna file within the dist directory.  Now in the Composer playground on the 'Define' tab, click 'Import/Replace', and upload this care-pay.bna file.  You can now create your own business network following the [Composer tutorial](https://hyperledger.github.io/composer/tutorials/playground-guide.html).