import { EVENT } from '~/utils/thankmas'

export function Story() {
  return (
    <section id="story" className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        {/* narrative */}
        <div>
          <p className="mb-4 font-mono text-xs tracking-[0.3em] text-sage-400 uppercase">
            The Story
          </p>
          <h2 className="text-4xl leading-tight font-bold sm:text-5xl">
            For years we played in Minecraft.
            <br />
            <span className="text-glow-sage text-sage-300">
              This year, we come home to Hytale.
            </span>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-cream-300">
            <p>
              Hytale Thankmas is the Hytale community's yearly charity
              fundraiser, run as part of Jacksepticeye's Thankmas. It started
              in 2021, and every December since the community has come
              together for one day to play, watch, and give.
            </p>
            <p>
              The day itself is an eight-plus-hour livestream built by members
              of the community: panels, games, challenges, and whatever else
              the day brings. Alongside the stream there are in-game events
              that anyone can jump into and play.
            </p>
            <p>
              For the first six years those games ran on Minecraft servers.
              Now that Hytale is out, {EVENT.year} is the first year we
              finally get to host them on Hytale itself.
            </p>
            <p>
              Donations are collected through Tiltify, so the money goes
              straight to the charity and never passes through our hands.
            </p>
          </div>
        </div>

        {/* what to expect card */}
        <div className="panel relative flex flex-col gap-6 self-start overflow-hidden p-8">
          <div
            aria-hidden="true"
            className="absolute -top-px left-8 h-1 w-16 bg-gold-500"
          />
          <h3 className="font-mono text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase">
            What to expect
          </h3>
          <ul className="space-y-4 text-cream-300">
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-gold-500" />
              <span>
                A day-long livestream with people from the Hytale community:
                panels, games, and whatever else happens on the day
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-sage-400" />
              <span>
                In-game events on Hytale that players can jump into
              </span>
            </li>
            <li className="flex gap-3">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-gold-500" />
              <span>
                Every dollar goes to the {EVENT.charity}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
