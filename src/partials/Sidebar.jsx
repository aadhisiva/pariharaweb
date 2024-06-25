import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import SidebarLinkGroup from './SidebarLinkGroup';
import { routes } from '../utils/constData';
import { Image } from 'react-bootstrap';
import GKImage from "../images/Gk.png"

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const navigate = useNavigate();

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        style={{position: 'sticky', top: 0}}
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static  lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64 hidden'
          }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className=" text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <i className="bi bi-arrow-left font-bold text-xl"></i>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <Image src={GKImage} width={50} />
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul>
              {/* Dashboard */}
              {(routes || []).map((obj, i) => {
                if (obj.child.length == 0) {
                  return (
                    <li key={i} className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes(obj.path.replace('/', '')) && 'bg-slate-900'}`}>
                      <NavLink
                        end
                        to={obj.path}
                        className={`block text-slate-200 truncate transition duration-150 ${pathname.includes(obj.path.replace('/', '')) ? 'hover:text-slate-200' : 'hover:text-white'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="grow flex items-center">
                            <i className={`fill-current ${obj.icon} ${pathname.includes(obj.path) ? 'text-indigo-300' : 'text-slate-400'}`}></i>
                            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              {obj.name}
                            </span>
                          </div>
                        </div>
                      </NavLink>
                    </li>
                  )
                } else {
                  return (
                    <SidebarLinkGroup key={i} activecondition={pathname.includes(obj.path.replace('/', ''))}>
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <a
                              href="#0"
                              className={`block text-slate-200 truncate transition duration-150 ${pathname.includes(obj.path.replace('/', '')) ? 'hover:text-slate-200' : 'hover:text-white'
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <i className={`fill-current ${obj.icon} ${pathname.includes(obj.path) ? 'text-indigo-300' : 'text-slate-400'}`}></i>
                                  <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    {obj.name}
                                  </span>
                                </div>
                                {/* Icon */}
                                <div className="flex shrink-0 ml-2">
                                  <i className={`bi bi-caret-${open ? 'down' : "up"}-fill`}></i>
                                </div>
                              </div>
                            </a>
                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                              <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                                {obj.child.map((childObj, j) => (
                                  <li key={j} className="mb-1 last:mb-0">
                                    <NavLink
                                      end
                                      to={childObj.path}

                                      className={({ isActive }) =>
                                        'block transition duration-150 truncate ' + (isActive ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                                      }
                                    >
                                      <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                        {childObj.name}
                                      </span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  )
                }
              })}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <i className="bi bi-arrow-bar-left text-3xl text-white txt font-bold"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
