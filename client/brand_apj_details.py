import os

filepath = "/home/sama/Desktop/APJ-Institute--Website/client/src/pages/CinematicGallery.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Header Visual Concept Badge
content = content.replace(
    "Визуальная концепция",
    "APJ GALLERY CONCEPT"
)

# 2. Circle 1 split text
old_circle1_text = """                <span className="text-[7.5px] sm:text-[9px] text-[#E5D5C5] font-black font-sans leading-none tracking-widest uppercase">
                  ACCOP-
                </span>
                <span className="text-[7.5px] sm:text-[9px] text-[#E5D5C5] font-black font-sans leading-none tracking-widest uppercase mt-0.5">
                  ТИМЕНТ
                </span>"""

new_circle1_text = """                <span className="text-[7.5px] sm:text-[9px] text-[#E5D5C5] font-black font-sans leading-none tracking-widest uppercase">
                  CAMPUS
                </span>
                <span className="text-[7.5px] sm:text-[9px] text-[#E5D5C5] font-black font-sans leading-none tracking-widest uppercase mt-0.5">
                  LIFE
                </span>"""
content = content.replace(old_circle1_text, new_circle1_text)

# 3. Circle 3 Review Text
old_circle3_text = """              <span className="text-[#E5D5C5] text-[10px] sm:text-[11px] lg:text-xs font-black font-sans tracking-[0.18em] uppercase">
                ОТЗЫВЫ
              </span>"""

new_circle3_text = """              <span className="text-[#E5D5C5] text-[10px] sm:text-[11px] lg:text-xs font-black font-sans tracking-[0.18em] uppercase">
                REVIEWS
              </span>"""
content = content.replace(old_circle3_text, new_circle3_text)

# 4. Circle 4 DÉLEYA Text
old_circle4_text = """              <span className="relative z-10 text-[#E5D5C5] text-[10px] sm:text-[11px] lg:text-xs font-serif font-bold tracking-[0.25em] uppercase">
                DÉLEYA
              </span>"""

new_circle4_text = """              <span className="relative z-10 text-[#E5D5C5] text-[10px] sm:text-[11px] lg:text-xs font-serif font-bold tracking-[0.25em] uppercase">
                APJ INST.
              </span>"""
content = content.replace(old_circle4_text, new_circle4_text)

# 5. Card 8 overlay text "New Collection"
old_card8_text = """              <h4 className="font-serif text-[#F3EFE9] text-3xl sm:text-4xl font-light leading-none tracking-wide">
                New
              </h4>
              <h4 className="font-serif text-[#F3EFE9] text-3xl sm:text-4xl font-light leading-none tracking-wide mt-1">
                Collection
              </h4>"""

new_card8_text = """              <h4 className="font-serif text-[#F3EFE9] text-3xl sm:text-4xl font-light leading-none tracking-wide">
                APJ
              </h4>
              <h4 className="font-serif text-[#F3EFE9] text-3xl sm:text-4xl font-light leading-none tracking-wide mt-1">
                Campuses
              </h4>"""
content = content.replace(old_card8_text, new_card8_text)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("ALL APJ BRANDING DETAILS COMPLETED")
