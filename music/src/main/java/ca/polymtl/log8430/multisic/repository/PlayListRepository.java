package ca.polymtl.log8430.multisic.repository;

import ca.polymtl.log8430.multisic.domain.PlayList;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the PlayList entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlayListRepository extends JpaRepository<PlayList, Long> {
    @Query("select distinct play_list from PlayList play_list left join fetch play_list.tracks")
    List<PlayList> findAllWithEagerRelationships();

    @Query("select play_list from PlayList play_list left join fetch play_list.tracks where play_list.id =:id")
    PlayList findOneWithEagerRelationships(@Param("id") Long id);

}
