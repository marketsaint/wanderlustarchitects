import { type ReactNode, useEffect, useState } from 'react';
import { cn } from '@/app/components/ui/utils';
import { Reveal, Input, SectionTitle, Textarea, Button } from '@/components/site/ui';

type Option = {
  value: string;
  label: string;
  description?: string;
};

const offices = [
  { city: 'Jaipur', address: 'C-Scheme, Jaipur, Rajasthan', phone: '+91 98284 85111' },
  { city: 'Surat', address: 'Athwa, Surat, Gujarat', phone: '+91 98284 85111' },
  { city: 'Dubai', address: 'IBN Battuta - 11th Floor - Jabel Ali - Dubai - United Arab Emirates', phone: '+971 54 505 2126' },
];

const serviceOptions: Option[] = [
  { value: 'architecture', label: 'Architecture Design', description: 'Planning, facade, and buildable design direction' },
  { value: 'interiors', label: 'Interior Design', description: 'Spatial planning, materials, and styling' },
  { value: 'fitout', label: 'Office Fit-Outs', description: 'Execution-led workplace and retail delivery' },
  { value: 'delivery', label: 'Project Delivery', description: 'Documentation, BOQs, and site coordination' },
  { value: 'landscape', label: 'Landscape Design', description: 'Outdoor planning and site aesthetics' },
  { value: 'documentation', label: 'Building Documentation', description: 'Tender-ready and site-ready drawing sets' },
];

const projectTypeOptions: Option[] = [
  { value: 'residential', label: 'Residential', description: 'Homes, villas, apartments, penthouses' },
  { value: 'commercial', label: 'Commercial', description: 'Offices, showrooms, retail, clinics' },
  { value: 'hospitality', label: 'Hospitality', description: 'Hotels, resorts, cafes, banquet venues' },
  { value: 'mixed-use', label: 'Mixed Use', description: 'More than one function or stacked uses' },
];

const projectIntentOptions: Option[] = [
  { value: 'private', label: 'Private', description: 'Personal home or personal-use property' },
  { value: 'commercial-intent', label: 'Commercial', description: 'Business-led property or revenue-focused space' },
  { value: 'developer', label: 'Developer', description: 'Multi-unit, investor, or builder-led project' },
];

const residenceTypeOptions: Option[] = [
  { value: 'villa', label: 'Villa' },
  { value: 'flat-apartment', label: 'Flat / Apartment' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'farmhouse', label: 'Farmhouse' },
  { value: 'other-residence', label: 'Other Residence' },
];

const apartmentConfigOptions: Option[] = [
  { value: '1bhk', label: '1 BHK / Studio' },
  { value: '2bhk', label: '2 BHK' },
  { value: '3bhk', label: '3 BHK' },
  { value: '4bhk', label: '4 BHK' },
  { value: '5bhk-plus', label: '5 BHK +' },
  { value: 'other-layout', label: 'Other' },
];

const commercialTypeOptions: Option[] = [
  { value: 'office', label: 'Office' },
  { value: 'retail', label: 'Retail' },
  { value: 'showroom', label: 'Showroom' },
  { value: 'clinic', label: 'Clinic' },
  { value: 'restaurant-cafe', label: 'Restaurant / Cafe' },
  { value: 'other-commercial', label: 'Other' },
];

const areaOptions: Option[] = [
  { value: 'under-1500', label: 'Under 1,500 sq.ft' },
  { value: '1500-3000', label: '1,500 - 3,000 sq.ft' },
  { value: '3000-6000', label: '3,000 - 6,000 sq.ft' },
  { value: '6000-10000', label: '6,000 - 10,000 sq.ft' },
  { value: '10000-plus', label: '10,000+ sq.ft' },
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  location: '',
  service: '',
  projectType: '',
  projectIntent: '',
  residenceType: '',
  apartmentConfig: '',
  commercialType: '',
  areaBand: '',
  message: '',
};

function FieldShell({
  label,
  optional = false,
  description,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className='space-y-3'>
      <div className='space-y-1'>
        <div className='flex items-center justify-between gap-3'>
          <label className='text-[11px] uppercase tracking-[0.22em] text-iron'>{label}</label>
          {optional ? <span className='text-[10px] uppercase tracking-[0.22em] text-iron/70'>Optional</span> : null}
        </div>
        {description ? <p className='text-sm text-iron'>{description}</p> : null}
      </div>
      {children}
      {error ? <p className='text-xs text-red-700'>{error}</p> : null}
    </div>
  );
}

function OptionGrid({
  options,
  value,
  onChange,
  columns = 'sm:grid-cols-2 lg:grid-cols-3',
}: {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  columns?: string;
}) {
  return (
    <div className={cn('grid gap-3', columns)}>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type='button'
            aria-pressed={isActive}
            onClick={() => onChange(option.value === value ? '' : option.value)}
            className={cn(
              'flex min-h-[92px] flex-col justify-between rounded-xl border px-4 py-4 text-left transition-all duration-300',
              isActive
                ? 'border-black bg-black text-white shadow-[0_18px_32px_-24px_rgba(0,0,0,0.45)]'
                : 'border-mist bg-white text-ink hover:border-ink hover:bg-neutral-50',
            )}
          >
            <span className='text-sm font-medium leading-6'>{option.label}</span>
            {option.description ? (
              <span className={cn('mt-3 text-xs leading-5', isActive ? 'text-white/72' : 'text-iron')}>{option.description}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function OptionChips({
  options,
  value,
  onChange,
}: {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className='flex flex-wrap gap-2'>
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type='button'
            aria-pressed={isActive}
            onClick={() => onChange(option.value === value ? '' : option.value)}
            className={cn(
              'rounded-full border px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-300',
              isActive ? 'border-black bg-black text-white' : 'border-mist bg-white text-iron hover:border-ink hover:text-ink',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    if (form.projectType !== 'residential' && (form.residenceType || form.apartmentConfig)) {
      setForm((current) => ({ ...current, residenceType: '', apartmentConfig: '' }));
    }
  }, [form.apartmentConfig, form.projectType, form.residenceType]);

  useEffect(() => {
    if (form.residenceType !== 'flat-apartment' && form.apartmentConfig) {
      setForm((current) => ({ ...current, apartmentConfig: '' }));
    }
  }, [form.apartmentConfig, form.residenceType]);

  useEffect(() => {
    if (form.projectType !== 'commercial' && form.commercialType) {
      setForm((current) => ({ ...current, commercialType: '' }));
    }
  }, [form.commercialType, form.projectType]);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Valid email required';
    if (form.phone.trim().length < 8) next.phone = 'Valid phone required';
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
            eyebrow='Start Project'
            title='Build your brief with guided selections before speaking to the studio.'
            description='Share your contact details, choose the project type, and define the property scope through quick selections instead of long manual typing.'
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
        <form onSubmit={onSubmit} className='space-y-8 rounded-xl border border-mist bg-white p-8 shadow-soft lg:p-10' noValidate>
          <div className='space-y-5'>
            <div className='space-y-1'>
              <p className='text-[11px] uppercase tracking-[0.24em] text-iron'>Contact Details</p>
              <p className='text-sm text-iron'>Required details so the team can reach you with the right next step.</p>
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
              <FieldShell label='Name' error={errors.name}>
                <Input value={form.name} onChange={(event) => onChange('name', event.target.value)} placeholder='Your full name' aria-label='Name' />
              </FieldShell>
              <FieldShell label='Email' error={errors.email}>
                <Input value={form.email} onChange={(event) => onChange('email', event.target.value)} placeholder='name@email.com' aria-label='Email' />
              </FieldShell>
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
              <FieldShell label='Phone' error={errors.phone}>
                <Input value={form.phone} onChange={(event) => onChange('phone', event.target.value)} placeholder='Preferred contact number' aria-label='Phone' />
              </FieldShell>
              <FieldShell label='Project Location' optional>
                <Input
                  value={form.location}
                  onChange={(event) => onChange('location', event.target.value)}
                  placeholder='City, site, or target region'
                  aria-label='Project location'
                />
              </FieldShell>
            </div>
          </div>

          <div className='space-y-5 border-t border-mist pt-8'>
            <div className='space-y-1'>
              <p className='text-[11px] uppercase tracking-[0.24em] text-iron'>Project Requirements</p>
              <p className='text-sm text-iron'>Use the guided selections below to shape the brief without needing to type everything manually.</p>
            </div>

            <FieldShell label='Service Needed' optional description='Choose the primary studio service you want to discuss first.'>
              <OptionGrid options={serviceOptions} value={form.service} onChange={(value) => onChange('service', value)} />
            </FieldShell>

            <FieldShell label='Type Of Project' optional description='This helps us separate residential, commercial, and hospitality workflows early.'>
              <OptionGrid
                options={projectTypeOptions}
                value={form.projectType}
                onChange={(value) => onChange('projectType', value)}
                columns='sm:grid-cols-2 xl:grid-cols-4'
              />
            </FieldShell>

            <FieldShell label='Private Or Commercial Intent' optional description='Useful for separating home-led requirements from business-led requirements.'>
              <OptionChips options={projectIntentOptions} value={form.projectIntent} onChange={(value) => onChange('projectIntent', value)} />
            </FieldShell>

            {form.projectType === 'residential' ? (
              <FieldShell label='Type Of Residence' optional description='Select the residential format so we can understand the design envelope.'>
                <OptionChips options={residenceTypeOptions} value={form.residenceType} onChange={(value) => onChange('residenceType', value)} />
              </FieldShell>
            ) : null}

            {form.projectType === 'residential' && form.residenceType === 'flat-apartment' ? (
              <FieldShell label='Apartment Configuration' optional description='For flats or apartments, choose the layout type.'>
                <OptionChips options={apartmentConfigOptions} value={form.apartmentConfig} onChange={(value) => onChange('apartmentConfig', value)} />
              </FieldShell>
            ) : null}

            {form.projectType === 'commercial' ? (
              <FieldShell label='Commercial Property Type' optional description='Choose the commercial use case to separate offices from retail and other formats.'>
                <OptionChips options={commercialTypeOptions} value={form.commercialType} onChange={(value) => onChange('commercialType', value)} />
              </FieldShell>
            ) : null}

            <FieldShell label='Approximate Area' optional description='An area band is enough for the first conversation.'>
              <OptionChips options={areaOptions} value={form.areaBand} onChange={(value) => onChange('areaBand', value)} />
            </FieldShell>
          </div>

          <div className='space-y-4 border-t border-mist pt-8'>
            <FieldShell
              label='Tell Us About Your Project'
              optional
              description='Optional. Add anything that does not fit the selections above, such as timelines, style direction, or execution urgency.'
            >
              <Textarea
                value={form.message}
                onChange={(event) => onChange('message', event.target.value)}
                placeholder='Optional notes about the brief, timeline, inspiration, or execution goals'
                aria-label='Project message'
                rows={6}
              />
            </FieldShell>
          </div>

          <div className='flex flex-wrap items-center gap-4'>
            <Button type='submit'>Send Inquiry</Button>
            <a
              href='https://wa.me/919828485111'
              className='inline-flex rounded-md border border-ink px-6 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ink hover:text-smoke'
            >
              WhatsApp us
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
