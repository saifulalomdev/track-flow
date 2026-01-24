"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlatformPicker } from '@/components/utm-builder/platform-picker'
import UTMViewCard from '@/components/utm-builder/utm-view-card'
import { MY_WEBSITES } from '@/constants/sites'
import { WebsiteSelector } from '@/features/utm-builder/componensts/website-selector'
import { formatSlug } from '@/lib/formate-slug'

export default function UTMBuilder() {
  // State Management (The Brain)
  const [selectedWebsite, setSelectedWebsite] = useState<string>("");
  const [selectedUTMSource, setSelectedUTMSource] = useState<string>("");
  const [campaign, setCampaign] = useState<string>("");

  // Logic: Automate the final link generation
  // We use selectedWebsite as the Base URL
  const cleanCampaign = formatSlug(campaign);

  const generatedLink = selectedWebsite
    ? `${selectedWebsite}?utm_source=${selectedUTMSource || 'direct'}&utm_campaign=${cleanCampaign || 'general'}`
    : "";

  return (
    <div className='space-y-8'>
      <header>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Generate Smart Link
        </h1>
        <p className="text-muted-foreground text-sm">
          No jargon. Just pick your destination and share.
        </p>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
        {/* LEFT COLUMN: Inputs */}
        <div className='space-y-6 bg-card p-6 rounded-xl border shadow-sm'>

          <WebsiteSelector
            label='1. Select Website'
            placeholder='Which site is this for?'
            options={MY_WEBSITES}
            value={selectedWebsite}
            onChange={setSelectedWebsite}
          />

          <div className="space-y-1.5">
            <Label>2. Campaign Name</Label>
            <Input
              placeholder='eg. summer sale'
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-3">
            <Label>3. Where are you sharing this?</Label>
            <PlatformPicker onChange={setSelectedUTMSource} />
          </div>
        </div>

        {/* RIGHT COLUMN: Preview Card */}
        <UTMViewCard
          finalUrl={generatedLink}
          campaign={campaign}
          platform={selectedUTMSource}
        />
      </div>
    </div>
  )
}