package com.mgu.mlnba.service;

import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl /*implements UserDetailsService, UserService*/ {
    
//    @Autowired
//    private UserDao userDao;

   /* @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = null;//userDao.findByUsername(username);
        if("marc".equalsIgnoreCase(username)) {
            user = new User();
            user.setUsername(username);
            user.setPassword(bcryptEncoder.encode("password"));
        }
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }*/

//    private Set<SimpleGrantedAuthority> getAuthority(User user) {
//        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
////        user.getRoles().forEach(role -> {
////            //authorities.add(new SimpleGrantedAuthority(role.getName()));
////            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
////        });
//        return authorities;
//        //return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
//    }

//    public List<User> findAll() {
//        List<User> list = new ArrayList<>();
//        userDao.findAll().iterator().forEachRemaining(list::add);
//        return list;
//    }
//
//    @Override
//    public void delete(long id) {
//        userDao.deleteById(id);
//    }
//
//    @Override
//    public User findOne(String username) {
//        return userDao.findByUsername(username);
//    }
//
//    @Override
//    public User findById(Long id) {
//        return userDao.findById(id).get();
//    }
//
//    @Override
//    public User save(UserDto user) {
//        User newUser = new User();
//        newUser.setUsername(user.getUsername());
//        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
//        newUser.setAge(user.getAge());
//        newUser.setSalary(user.getSalary());
//        return userDao.save(newUser);
//    }
}