const fs = require('fs');

let content = fs.readFileSync('client/src/pages/CoursesPage.jsx', 'utf8');

const oldGridBlock = `        {/* Course Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.article
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white backdrop-blur-xl border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(37,99,235,0.4)]"
              >
                {/* Image Section */}
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 z-20 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur border border-slate-200 flex items-center justify-center text-[#1e3a5f] shadow-lg group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors duration-300">
                    {course.icon}
                  </div>
                  {/* Category Badge */}
                  <span className="absolute bottom-4 left-4 z-20 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase bg-[#1e3a5f] text-white backdrop-blur border border-white/20 shadow-lg">
                    {course.category}
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-6 sm:p-8 relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1e3a5f]/10 rounded-full blur-2xl group-hover:bg-[#1e3a5f]/20 transition-all duration-500"></div>
                  
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1e3a5f] transition-colors leading-tight mb-3">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm font-medium border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={16} className="text-[#1e3a5f]" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <BookOpen size={16} className="text-[#1e3a5f]" />
                      <span className="truncate">{course.eligibility}</span>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="mt-8 flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 text-sm font-bold text-slate-900 group-hover:text-white group-hover:bg-[#1e3a5f] group-hover:border-transparent transition-all duration-300"
                  >
                    Apply Now <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>`;

const renderFunction = `        {/* Course Card Renderer */}
        {(() => {
          const renderCourseCard = (course) => (
            <motion.article
              layout
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.9 }}
              key={course.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white backdrop-blur-xl border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(37,99,235,0.4)]"
            >
              {/* Image Section */}
              <div className="relative h-60 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                {/* Floating Icon */}
                <div className="absolute top-4 right-4 z-20 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur border border-slate-200 flex items-center justify-center text-[#1e3a5f] shadow-lg group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors duration-300">
                  {course.icon}
                </div>
                {/* Category Badge */}
                <span className="absolute bottom-4 left-4 z-20 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase bg-[#1e3a5f] text-white backdrop-blur border border-white/20 shadow-lg">
                  {course.category}
                </span>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-1 p-6 sm:p-8 relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1e3a5f]/10 rounded-full blur-2xl group-hover:bg-[#1e3a5f]/20 transition-all duration-500"></div>
                
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1e3a5f] transition-colors leading-tight mb-3">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm font-medium border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={16} className="text-[#1e3a5f]" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <BookOpen size={16} className="text-[#1e3a5f]" />
                    <span className="truncate">{course.eligibility}</span>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-8 flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 text-sm font-bold text-slate-900 group-hover:text-white group-hover:bg-[#1e3a5f] group-hover:border-transparent transition-all duration-300"
                >
                  Apply Now <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          );

          return (
            <>
              {filteredCourses.length === 5 ? (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {/* Left Column (2 cards) */}
                  <div className="flex flex-col gap-8">
                    {filteredCourses.slice(0, 2).map(renderCourseCard)}
                  </div>
                  
                  {/* Center Column (1 card, vertically centered, desktop only) */}
                  <div className="hidden lg:flex flex-col gap-8 justify-center">
                    {filteredCourses.slice(4, 5).map(renderCourseCard)}
                  </div>
                  
                  {/* Right Column (2 cards) */}
                  <div className="flex flex-col gap-8">
                    {filteredCourses.slice(2, 4).map(renderCourseCard)}
                  </div>
                  
                  {/* Center Column (1 card, mobile/tablet only, stacked at bottom) */}
                  <div className="flex lg:hidden flex-col gap-8 justify-center sm:col-span-2">
                    {filteredCourses.slice(4, 5).map(renderCourseCard)}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCourses.map(renderCourseCard)}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          );
        })()}
`;

content = content.replace(oldGridBlock, renderFunction);

fs.writeFileSync('client/src/pages/CoursesPage.jsx', content, 'utf8');
console.log("Updated CoursesPage.jsx");
