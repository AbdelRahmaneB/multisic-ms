package ca.polymtl.log8430.multisic.gateway.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.polymtl.log8430.multisic.gateway.domain.Authority;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
