import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  imports: [CommonModule, RouterModule] // Required for *ngFor, *ngIf, and routerLink
})
export class FaqComponent {
  faqs = [
    {
      question: 'What makes Country Meat different from regular chicken?',
      answer: 'Country Meat offers authentic native breeds of country chicken, naturally raised in free-range farms and delivered fresh within hours of processing.',
      open: false
    },
    {
      question: 'Did You Know? Depending on the breed, country chicken takes 5–9 months to grow naturally.',
      answer: 'This gives the meat its firm texture, rich flavor, and superior nutrition.',
      open: false
    },
    {
      question: 'What breeds of country chicken do you provide?',
      answer: 'Original Country Chicken Rooster (Country King), Original Country Chicken Hen (Country Queen), Aseel (Country Warrior), Sonali & Mysore Nati (Tender Country), Kadaknath. Each breed has unique texture, flavour, and cultural heritage.',
      open: false
    },
    {
      question: 'Are these chickens really free-range?',
      answer: 'Yes. Our birds roam freely outdoors, forage naturally, and are supplemented with natural feed. They are not confined in cages, which ensures healthier growth and better immunity.',
      open: false
    },
    {
      question: 'What do you mean by “naturally raised”?',
      answer: 'Our birds are not force-fed or given growth-promoting hormones. They grow at their own pace (150–300 days), ensuring natural development, stronger bones, and richer meat quality.',
      open: false
    },
    {
      question: 'Do you use antibiotics or hormones?',
      answer: 'No. We avoid unnecessary antibiotics and never use growth hormones. Birds are raised with traditional farming methods for clean and chemical-free meat.',
      open: false
    },
    {
      question: 'What are the benefits of country eggs?',
      answer: 'Country eggs (Nati eggs) are richer in Omega-3 fatty acids, protein, Vitamin A, and minerals compared to commercial eggs. They are easier to digest and traditionally known for strengthening immunity.',
      open: false
    },
    {
      question: 'How do you ensure hygiene and safety?',
      answer: 'We follow strict farm-to-fork hygiene protocols: healthy rearing, humane transport, and slaughtering in hygienic city-based units. The chicken reaches you within hours of processing—not days.',
      open: false
    },
    {
      question: 'Do different breeds lay different eggs?',
      answer: 'Yes. For example, Aseel and Sonali hens lay slightly larger eggs, while Country Queen hens lay smaller but nutrient dense eggs. All eggs come from cage-free, naturally raised hens.',
      open: false
    },
    {
      question: 'How do you sell chicken—by weight or bird?',
      answer: 'We sell based on whole bird weight. Each native bird is unique in size (e.g., 1.25–1.75 kg). You pay for the whole bird, and the processed meat yield is shared at delivery.',
      open: false
    },
    {
      question: 'How fast is delivery after slaughtering?',
      answer: 'We operate on a Just-In-Time model. Birds are transported from farms to city-based slaughtering units only when orders are visible, ensuring delivery within 2–3 hours.',
      open: false
    },
    {
      question: 'Why don’t you allow cancellations before delivery?',
      answer: 'Once an order is placed, a bird is specially chosen and processed for you. This ensures zero wastage and maximum freshness with no pre-slaughtered or frozen stock.',
      open: false
    },
    {
      question: 'How does Country Meat support farmers?',
      answer: 'We partner directly with small farmers, offering fair prices, transparent practices, and sustainable livelihoods. Every order supports local farmers and preserves native poultry breeds.',
      open: false
    },
    {
      question: 'Why does country chicken take longer to cook than regular chicken?',
      answer: 'Country chicken grows naturally over 5–9 months. Because of this, the meat is firmer and denser, requiring more time or pressure to cook thoroughly.',
      open: false
    },
    {
      question: 'How can you confidently say that your meats do not have hormones in them?',
      answer: 'We source directly from partner farms and monitor rearing practices. Our processing units are hygienic and transparent—no shortcuts, no chemicals.',
      open: false
    },
    {
      question: 'Are your meats Halal Cut?',
      answer: 'Yes, all meats are 100% halal cut.',
      open: false
    },
    {
      question: 'Why do you apply turmeric to the chicken?',
      answer: 'Turmeric is a natural antiseptic. Applying turmeric to freshly processed chicken reduces microbes, enhances hygiene, and adds a mild earthy flavour.',
      open: false
    },
    {
      question: 'Why are the chickens lightly smoked after turmeric application?',
      answer: 'Smoking acts as a natural preservative and adds a subtle smoky aroma, keeping meat fresh without chemicals.',
      open: false
    },
    {
      question: 'Does smoking affect the freshness of the chicken?',
      answer: 'No. The process is light and natural. Chicken is delivered fresh within hours, never stored or frozen.',
      open: false
    },
    {
      question: 'Why do you charge for delivery service?',
      answer: 'The small delivery fee covers temperature-controlled transport, eco-friendly packaging, and trained staff to maintain safety & freshness.',
      open: false
    },
    {
      question: 'What are the payment options supported?',
      answer: 'Online payments only.',
      open: false
    },
    {
      question: 'Is my credit card information safe on your site?',
      answer: 'Yes. We do not store credit card details. Transactions are carried out via trusted Razorpay-backed gateway.',
      open: false
    },
    {
      question: 'I cancelled my order paid online. How will I get my money back and when?',
      answer: 'The account used for payment will be credited with the refund within 8–9 working days.',
      open: false
    },
    {
      question: 'Can I pre-book an order?',
      answer: 'Yes! Pre-booking helps us plan inventory efficiently and ensures you get your preferred birds fresh. Special discounts may apply.',
      open: false
    },
    {
      question: 'Grievances',
      answer: 'If you have complaints or suggestions about the content published, please write to our Grievance Officer. This is an electronic record under the Information Technology Act, 2000.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
