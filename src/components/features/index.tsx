import React from "react";
import LeadQualify from "../../app/assets/LeadQualify.svg";
import FilterQuestions from "../../app/assets/filterquestions.png";
import LeadQualification from "../../app/assets/LeadQualification.svg";
import AutomatedSchedule from "../../app/assets/AutomatedSchedule.svg";
import AutomatedScheduling from "../../app/assets/AutomatedScheduling.svg";
import BookMeeting from "../../app/assets/BookMeeting.png";
import LiveAgent from "../../app/assets/LiveAgent.svg";
import LiveAgentHandoff from "../../app/assets/LiveAgentHandOff.png";
import LiveAgentHand from "../../app/assets/LiveAgentHandOff.svg";
import MultiDomain from "../../app/assets/MultiDomain.svg";
import MultiDomainCamp from "../../app/assets/MultiDomainCampaigns.svg";
import MultiDomainCampaign2 from "../../app/assets/MultiDomainCampaign2.png";
import MultiDomainCampaign from "../../app/assets/MultiDomainCampaign.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {};

const Features = (props: Props) => {
  return (
    <section
      id="features"
      className="  w-[80%] mx-auto bg-slate-50 rounded-3xl shadow-xl p-[8px]"
    >
      <div className=" flex-col items-center">
        <div className="flex  relative  gap-5 bg-inherit w-full ">
          <Image src={LeadQualify} alt="LeadQualify" />
          <div className="w-full flex items-center justify-center absolute h-full gap-[50px]">
            <Image
              className="w-[470px] rounded-2xl shadow-xl"
              src={FilterQuestions}
              alt="FilterQuestions"
            />
            <div className="w-[470px]  flex flex-col gap-7">
              <Image
                height={60}
                src={LeadQualification}
                alt="LeadQualification"
              />
              <h2 className="text-4xl font-bold">Lead Qualification</h2>
              <p className="text-xl text-muted-foreground">
                Transform website visitors into loyal customers with intelligent
                chatbots that understand, qualify, and convert.
              </p>
              <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
            </Link>
            </div>
          </div>
        </div>
        <div className="flex items-end relative  gap-5 bg-inherit w-full ">
          <div className="w-full flex items-center justify-center absolute h-full gap-[50px]">
            <div className="w-[470px]  flex flex-col gap-7">
              <Image
                height={60}
                src={MultiDomainCamp}
                alt="LeadQualification"
              />
              <h2 className="text-4xl font-bold">Multi-Domain Campaigns</h2>
              <p className="text-xl text-muted-foreground">
                Run targeted engagement campaigns across all your websites and landing pages from one dashboard.
              </p>
              <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
            </Link>
            </div>
            <div className="relative">
              <Image
              className="w-[470px] rounded-2xl shadow-xl"
              src={MultiDomainCampaign}
              alt="filterQuestions2"
              />
            <Image
              className="w-[470px] absolute top-20 left-10 rounded-2xl shadow-xl"
              src={MultiDomainCampaign2}
              alt="FilterQuestions"
            />
            </div>
          </div>
          <div className="w-full flex items-end justify-end">
          <Image src={MultiDomain}  alt="MultiDomain" />
          </div>
        </div>
        <div className="flex  relative  gap-5 bg-inherit w-full ">
          <Image src={AutomatedSchedule} alt="LeadQualify" />
          <div className="w-full flex items-center justify-center absolute h-full gap-[50px]">
            <Image
              className="w-[470px] rounded-2xl shadow-xl"
              src={BookMeeting}
              alt="FilterQuestions"
            />
            <div className="w-[470px]  flex flex-col gap-7">
              <Image
                height={60}
                src={AutomatedScheduling}
                alt="LeadQualification"
              />
              <h2 className="text-4xl font-bold">Automated Scheduling</h2>
              <p className="text-xl text-muted-foreground">
                Book appointments and demos directly through the chat interface,
                synced with your calendar.
              </p>
              <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
            </Link>
            </div>
          </div>
        </div>
        <div className="flex  relative  gap-5 bg-inherit w-full ">
          <div className="w-full flex items-center justify-center absolute h-full gap-[50px]">
            
            <div className="w-[470px]  flex flex-col gap-7">
              <Image height={60} src={LiveAgentHand} alt="LeadQualification" />
              <h2 className="text-4xl font-bold">Live Agent Handoff</h2>
              <p className="text-xl text-muted-foreground">
                Seamlessly transfer complex conversations to your support team
                when human assistance is needed.
              </p>
              <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Get Started
            </Button>
            </Link>
            </div>
            <Image
              className="w-[470px] rounded-2xl shadow-xl"
              src={LiveAgentHandoff}
              alt="FilterQuestions"
            />
          </div>
          <div className="w-full flex items-end justify-end">
          <Image src={LiveAgent} alt="LiveAgent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
