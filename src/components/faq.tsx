
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export default function FAQSection() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-100 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4 ">
          <AccordionItem value="item-1">
            <AccordionTrigger>How can I publish a new article?</AccordionTrigger>
            <AccordionContent>
              You can publish a new article by clicking on the 'Write' button at the top-right corner. This will open the editor where you can create and format your content.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I customize my profile?</AccordionTrigger>
            <AccordionContent>
              Go to your profile page and click on the 'Edit Profile' button. You can update your name, bio, profile picture, and other settings.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I save articles for offline reading?</AccordionTrigger>
            <AccordionContent>
              Yes, you can save articles by clicking the 'Save' button below each article. Your saved articles will be available in the 'Saved' section of your profile.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I follow a writer or publication?</AccordionTrigger>
            <AccordionContent>
              To follow a writer or publication, click the 'Follow' button on their profile or publication page. This will add their latest articles to your feed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

