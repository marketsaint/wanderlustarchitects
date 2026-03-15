import { useState } from 'react';
import { Reveal, Input, SectionTitle, Textarea, Button } from '@/components/site/ui';

const offices = [
  { city: 'Jaipur', address: 'C-Scheme, Jaipur, Rajasthan', phone: '+91 98284 85111' },
  { city: 'Surat', address: 'Athwa, Surat, Gujarat', phone: '+91 98284 85111' },
  { city: 'Dubai', address: 'IBN Battuta - 11th Floor - Jabel Ali - Dubai - United Arab Emirates', phone: '+971 54 505 2126' },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  location: '',
  service: 'Architecture Design',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Valid email required';
    if (form.phone.trim().length < 8) next.phone = 'Valid phone required';
    if (!form.message.trim()) next.message = 'Please add project details';
    return next;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      return;
    }

    window.setTimeout(() => {
      setSubmitted(true);
      setForm(initialForm);
    }, 500);
  };

  return (
    <div className='mx-auto max-w-7xl space-y-12 px-4 py-16 sm:px-6 lg:px-10 lg:py-24'>
      <Reveal>
        <section className='rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-12'>
          <SectionTitle
            eyebrow='Contact'
            title='Discuss your project scope with our architecture and delivery team.'
            description='Share your goals and timelines. We will respond with the right design and execution pathway.'
          />
        </section>
      </Reveal>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {offices.map((office, index) => (
          <Reveal key={office.city} delay={index * 0.05}>
            <article className='h-full rounded-xl border border-mist bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-ink'>
              <h3 className='text-2xl'>{office.city}</h3>
              <p className='mt-2 text-sm text-iron'>{office.address}</p>
              <a href={`tel:${office.phone.replace(/\s+/g, '')}`} className='mt-3 block text-xs uppercase tracking-[0.16em] text-iron hover:text-ink'>
                {office.phone}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {submitted ? (
        <div className='border border-mist bg-white p-8 shadow-soft'>
          <p className='text-xs uppercase tracking-[0.2em] text-iron'>Submitted</p>
          <h3 className='mt-3 text-3xl'>Thanks, we received your brief.</h3>
          <p className='mt-3 text-sm text-iron'>Our team will reach out shortly with a consultation slot.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className='space-y-4 rounded-xl border border-mist bg-white p-8 shadow-soft' noValidate>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <Input value={form.name} onChange={(event) => onChange('name', event.target.value)} placeholder='Name*' aria-label='Name' />
              {errors.name ? <p className='mt-1 text-xs text-red-700'>{errors.name}</p> : null}
            </div>
            <div>
              <Input value={form.email} onChange={(event) => onChange('email', event.target.value)} placeholder='Email*' aria-label='Email' />
              {errors.email ? <p className='mt-1 text-xs text-red-700'>{errors.email}</p> : null}
            </div>
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            <div>
              <Input value={form.phone} onChange={(event) => onChange('phone', event.target.value)} placeholder='Phone*' aria-label='Phone' />
              {errors.phone ? <p className='mt-1 text-xs text-red-700'>{errors.phone}</p> : null}
            </div>
            <Input value={form.location} onChange={(event) => onChange('location', event.target.value)} placeholder='Project location' aria-label='Project location' />
          </div>
          <select
            value={form.service}
            onChange={(event) => onChange('service', event.target.value)}
            className='w-full rounded-md border border-silver bg-white px-4 py-3 text-sm'
            aria-label='Service'
          >
            <option>Architecture Design</option>
            <option>Interior Design</option>
            <option>Office Fit-Outs</option>
            <option>Project Delivery</option>
            <option>Landscape Design</option>
            <option>3D Modelling</option>
            <option>Building Documentation</option>
          </select>
          <div>
            <Textarea
              value={form.message}
              onChange={(event) => onChange('message', event.target.value)}
              placeholder='Tell us about your project*'
              aria-label='Project message'
              rows={6}
            />
            {errors.message ? <p className='mt-1 text-xs text-red-700'>{errors.message}</p> : null}
          </div>
          <Button type='submit'>Send Inquiry</Button>
        </form>
      )}

      <a href='https://wa.me/919828485111' className='inline-flex rounded-md border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-smoke'>
        WhatsApp us
      </a>
    </div>
  );
}
